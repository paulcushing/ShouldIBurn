const { withSentryConfig } = require('@sentry/nextjs')

const {
    NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
    SENTRY_ORG,
    SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN,
    NODE_ENV,
    VERCEL_GIT_COMMIT_SHA,
} = process.env

const moduleExports = {
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
}

const sentryWebpackPluginOptions = {
    silent: true, // Suppresses all logs
    hideSourceMaps: true, // Suppresses warnings from the Sentry CLI
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
