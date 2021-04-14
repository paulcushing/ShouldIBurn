import * as Sentry from '@sentry/node'
import { Integrations } from "@sentry/tracing";

export const init = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {

    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: "my-project-name@" + process.env.npm_package_version,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }
}