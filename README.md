# ShouldIBurn.com

This is a small project to build a simple web app that will provide users with one place to check the conditions and know whether it's safe to burn weeds on their property today. It uses the Open Weather API and the AirNow API for weather and air quality index data.
ShouldIBurn is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local development

Install the npm packages, then run the development server:

```bash
yarn install
yarn dev
```

Chrome doesn't appreciate you using the `geolocation` features on non-https domains, so local development against the geolocation parts is best done with Firefox or Safari.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/).

Currently, we're using routes `weather` and `airquality`. Both accept a POST request that include a json object that includes the latitude and longitude of the desired location.

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
-   Allow user to chooze location rather than rely on geolocation
