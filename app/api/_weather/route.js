import * as Sentry from '@sentry/nextjs';
const fetch = require('node-fetch');

export const POST = async (req) => {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
        return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
    }

    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.OW_API_KEY}`;

    try {
        const response = await fetch(openWeatherUrl);
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response(null, { status: 500 });
    }
};