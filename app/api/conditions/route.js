import * as Sentry from '@sentry/nextjs';
import fetch from 'node-fetch';

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
        const airNowUrl = `https://www.airnowapi.org//aq/observation/latLong/current/?format=application/json&latitude=${latitude}&longitude=${longitude}&date=${todayDate}&distance=50&API_KEY=${process.env.AN_API_KEY}`;

        const weather = fetch(openWeatherUrl).then((response) => response.json());
        const air = fetch(airNowUrl).then((response) => response.json());

        const [weatherData, airData] = await Promise.all([weather, air]);

        return new Response(JSON.stringify({ weather: weatherData, air: airData }), { status: 200 });
    } catch (error) {
        if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(error);
        } else {
            console.error('Error:', error);
        }
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};

export const POST = postHandler;