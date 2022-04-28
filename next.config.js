// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const {
    NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
    SENTRY_ORG,
    SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN,
    NODE_ENV,
    VERCEL_GIT_COMMIT_SHA,
} = process.env

const withWorkbox = require('next-with-workbox')

const moduleExports = withWorkbox({
    workbox: {
        //swSrc: "worker.js",
    },
    productionBrowserSourceMaps: true,
    env: {
        // Make the COMMIT_SHA available to the client so that Sentry events can be
        // marked for the release they belong to. It may be undefined if running
        // outside of Vercel
        NEXT_PUBLIC_COMMIT_SHA: VERCEL_GIT_COMMIT_SHA,
    },
    webpack: (config, options) => {
        // Define an environment variable so source code can check whether or not
        // it's running on the server so we can correctly initialize Sentry
        config.plugins.push(
            new options.webpack.DefinePlugin({
                'process.env.NEXT_IS_SERVER': JSON.stringify(
                    options.isServer.toString()
                ),
            })
        )
        return config
    },
})

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
