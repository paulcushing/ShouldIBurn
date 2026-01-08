import * as Sentry from '@sentry/nextjs';

export const POST = async (req) => {
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
        const airNowUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${latitude}&longitude=${longitude}&date=${todayDate}&distance=25&API_KEY=${process.env.AN_API_KEY}`;

        const response = await fetch(airNowUrl);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch air quality data from upstream service' }), { status: 502 });
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            return new Response(JSON.stringify({ error: 'Unexpected response format from air quality service' }), { status: 502 });
        }
        return new Response(JSON.stringify(data[0]), { status: 200 });
    } catch (err) {
        Sentry.captureException(err);
        if (err instanceof SyntaxError) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};