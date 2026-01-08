import * as Sentry from '@sentry/nextjs';

export const POST = async (req) => {
    try {
        const { latitude, longitude } = await req.json();

        if (!latitude || !longitude) {
            return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
        }

        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.OW_API_KEY}`;
        const openWeatherAirUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.OW_API_KEY}`;

        const weather = fetch(openWeatherUrl).then((response) => response.json());
        const air = fetch(openWeatherAirUrl).then((response) => response.json());

        const [weatherData, airData] = await Promise.all([weather, air]);

        return new Response(JSON.stringify({ weather: weatherData, air: airData }), { status: 200 });
    } catch (error) {
        Sentry.captureException(error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};