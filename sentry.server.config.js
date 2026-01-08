// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  Sentry.init({
    dsn: SENTRY_DSN || 'https://992be6eb86df4fa3a5ee6ea104eaa993@o501587.ingest.sentry.io/5701435',
    tracesSampleRate: 0.1,
    // Optionally use tracesSampler for finer control
  });
}
