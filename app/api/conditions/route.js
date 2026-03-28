import * as Sentry from '@sentry/nextjs';

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

const postHandler = async (req) => {
    try {
        const { latitude, longitude } = await req.json();

        if (!latitude || !longitude) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const date = ('0' + now.getDate()).slice(-2);
        const todayDate = `${year}-${month}-${date}`;
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.OW_API_KEY}`;

        const weatherResp = await fetch(openWeatherUrl);
        if (!weatherResp.ok) {
            return new Response(JSON.stringify({ error: 'Upstream service error' }), { status: 502 });
        }
        const weatherData = await weatherResp.json();

        // Try AirNow with increasing search radii until data is found
        const searchDistances = [50, 100, 150, 200];
        let airData = [];
        let usedDistance = null;

        for (const distance of searchDistances) {
            const airNowUrl = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${latitude}&longitude=${longitude}&date=${todayDate}&distance=${distance}&API_KEY=${process.env.AN_API_KEY}`;
            const airResp = await fetch(airNowUrl);
            if (!airResp.ok) {
                return new Response(JSON.stringify({ error: 'Upstream service error' }), { status: 502 });
            }
            airData = await airResp.json();
            if (airData.length > 0) {
                usedDistance = distance;
                break;
            }
        }

        // Determine if a fallback station was used and calculate its distance
        let nearestStation = null;
        if (airData.length > 0 && usedDistance > 50) {
            const station = airData[0];
            const distanceMiles = haversineDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                station.Latitude,
                station.Longitude
            );
            nearestStation = {
                name: station.ReportingArea,
                distance: distanceMiles,
            };
        }

        return new Response(JSON.stringify({ weather: weatherData, air: airData, nearestStation }), { status: 200 });
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof SyntaxError) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};

export const POST = postHandler;