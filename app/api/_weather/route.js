import * as Sentry from '@sentry/nextjs';

export const POST = async (req) => {
    try {
        const { latitude, longitude } = await req.json();

        if (!latitude || !longitude) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
        }

        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.OW_API_KEY}`;

        const response = await fetch(openWeatherUrl);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Upstream weather service error' }), { status: 502 });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err) {
        Sentry.captureException(err);
        if (err instanceof SyntaxError) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};