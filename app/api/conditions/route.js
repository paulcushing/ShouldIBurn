import * as Sentry from '@sentry/nextjs';

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
        const airNowUrl = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${latitude}&longitude=${longitude}&date=${todayDate}&distance=50&API_KEY=${process.env.AN_API_KEY}`;

        const weatherResp = await fetch(openWeatherUrl);
        const airResp = await fetch(airNowUrl);
        if (!weatherResp.ok || !airResp.ok) {
            return new Response(JSON.stringify({ error: 'Upstream service error' }), { status: 502 });
        }
        const weatherData = await weatherResp.json();
        const airData = await airResp.json();

        return new Response(JSON.stringify({ weather: weatherData, air: airData }), { status: 200 });
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof SyntaxError) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};

export const POST = postHandler;