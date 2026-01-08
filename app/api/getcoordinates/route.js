import * as Sentry from '@sentry/nextjs';

export const POST = async (req) => {
    try {
        const { zipcode, city } = await req.json();

        if (!zipcode && !city) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
        }

        let url;
        if (zipcode) {
            url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${process.env.OW_API_KEY}`;
        } else if (city) {
            const formattedCity = city.replace(/\s/g, '') + ',US';
            url = `https://api.openweathermap.org/geo/1.0/direct?q=${formattedCity}&limit=1&appid=${process.env.OW_API_KEY}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Upstream geocoding service error' }), { status: 502 });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof SyntaxError) {
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};