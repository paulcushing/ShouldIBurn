import * as Sentry from '@sentry/nextjs';
const fetch = require('node-fetch');

export const POST = async (req) => {
    try {
        const { zipcode, city } = await req.json();

        if (!zipcode && !city) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
        }

        let url;
        if (zipcode) {
            url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${process.env.OW_API_KEY}`;
        } else if (city) {
            const formattedCity = city.replace(/\s/g, '') + ',US';
            url = `http://api.openweathermap.org/geo/1.0/direct?q=${formattedCity}&limit=1&appid=${process.env.OW_API_KEY}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            return new Response(JSON.stringify(data), { status: 200 });
        } catch (err) {
            console.log(err);
            return new Response(null, { status: 500 });
        }
    } catch (error) {
        Sentry.captureException(error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};