import * as Sentry from '@sentry/node'
import { Integrations } from "@sentry/tracing";
import { RewriteFrames } from '@sentry/integrations'

export const init = () => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
        const integrations = [new Integrations.BrowserTracing()]
        if (
          process.env.NEXT_IS_SERVER === 'true' &&
          process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
        ) {
          // For Node.js, rewrite Error.stack to use relative paths, so that source
          // maps starting with ~/_next map to files in Error.stack with path
          // app:///_next
          integrations.push(
            new RewriteFrames({
              iteratee: (frame) => {
                frame.filename = frame.filename.replace(
                  process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
                  'app:///'
                )
                frame.filename = frame.filename.replace('.next', '_next')
                return frame
              },
            })
          )
        }

    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: "my-project-name@" + process.env.npm_package_version,
      integrations,
      tracesSampleRate: 1.0,
    })
  }
}