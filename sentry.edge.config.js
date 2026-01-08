// This file configures the initialization of Sentry on edge runtimes.
import * as Sentry from '@sentry/nextjs';

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
    Sentry.init();
}