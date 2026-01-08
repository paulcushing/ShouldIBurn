# [ShouldIBurn.com](https://shouldiburn.com)

This is a small project to build a simple web app that will provide users with one place to check the conditions and know whether it's safe to burn weeds on their property today. It uses the OpenWeather API and the AirNow API for weather and air quality index data.
ShouldIBurn is a [Next.js 15](https://nextjs.org/) App Router project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local development

Create a `.env` file with required environment variables:

```bash
OW_API_KEY=********************
AN_API_KEY=********************
# Required in production: Sentry DSN for error monitoring
SENTRY_DSN=************************
```

Install dependencies and run the dev server:

```bash
yarn install
yarn dev
```

Chrome doesn't appreciate you using the `geolocation` features on non-https domains, so local development against the geolocation parts is best done with Firefox or Safari.

API route handlers live under `app/api/*/route.js` and are accessible at [http://localhost:3000/api/](http://localhost:3000/api/).

Currently, routes `weather` and `airquality` accept a POST request with a JSON body including the latitude and longitude of the desired location.

```javascript
{
    "latitude": 43.5441,
    "longitude": -116.566
}
```

## Status

The app is currently deployed to ShouldIBurn.com. I'd like to keep things simple and useful, but here are a few things that still need done.

-   Add Sentry.io for monitoring
-   Allow user to reset cookies (location) to avoid stale data if they've changed locations

## Deployment

This app uses Next.js 15 App Router. Build with:

```bash
yarn build
yarn start
```

If deploying to Netlify, ensure environment variables (OW_API_KEY, AN_API_KEY, SENTRY_DSN) are configured. Source map uploads for Sentry are disabled locally.

-   Allow user to choose location rather than rely on geolocation
