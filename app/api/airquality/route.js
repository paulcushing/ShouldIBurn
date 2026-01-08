import * as Sentry from '@sentry/nextjs';
const fetch = require('node-fetch');

export const POST = async (req) => {
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

    try {
        const response = await fetch(airNowUrl);
        const data = await response.json();
        return new Response(JSON.stringify(data[0]), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response(null, { status: 500 });
    }
};