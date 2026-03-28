import * as Sentry from '@sentry/nextjs';

const REQUEST_TIMEOUT_MS = 8000;

const fetchJsonWithTimeout = async (url, serviceName) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const startedAt = Date.now();

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`${serviceName} upstream returned ${response.status}`);
        }

        const data = await response.json();
        return {
            ok: true,
            data,
            durationMs: Date.now() - startedAt,
        };
    } catch (error) {
        return {
            ok: false,
            error,
            durationMs: Date.now() - startedAt,
        };
    } finally {
        clearTimeout(timeout);
    }
};

const postHandler = async (req) => {
    try {
        const { latitude, longitude } = await req.json();

        if (latitude == null || longitude == null) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const date = ('0' + now.getDate()).slice(-2);
        const todayDate = `${year}-${month}-${date}`;
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.OW_API_KEY}`;
        const airNowUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${latitude}&longitude=${longitude}&date=${todayDate}&distance=25&API_KEY=${process.env.AN_API_KEY}`;

        const [weatherResult, airResult] = await Promise.all([
            fetchJsonWithTimeout(openWeatherUrl, 'OpenWeather'),
            fetchJsonWithTimeout(airNowUrl, 'AirNow'),
        ]);

        if (!weatherResult.ok) {
            if (weatherResult.error) {
                Sentry.captureException(weatherResult.error);
            }
            return new Response(JSON.stringify({ error: 'Upstream service error' }), { status: 502 });
        }

        let degraded = false;
        let warning = null;
        let airData = null;

        if (!airResult.ok) {
            degraded = true;
            warning = 'Air quality data is currently unavailable. Burn recommendation is based on wind speed only.';
            if (airResult.error) {
                Sentry.captureException(airResult.error);
            }
        } else if (!Array.isArray(airResult.data) || airResult.data.length === 0) {
            degraded = true;
            warning = 'Air quality data is currently unavailable. Burn recommendation is based on wind speed only.';
        } else {
            airData = airResult.data;
        }

        return new Response(
            JSON.stringify({
                weather: weatherResult.data,
                air: airData,
                degraded,
                warning,
            }),
            { status: 200 }
        );
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof SyntaxError) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};

export const POST = postHandler;
