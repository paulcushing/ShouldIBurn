"use client";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error, reset }) {
  // Report error to Sentry
  if (error) {
    Sentry.captureException(error);
  }

  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h2>Something went wrong</h2>
          <p>{error?.message || "An unexpected error occurred."}</p>
          <button onClick={() => reset()} style={{ marginTop: 12 }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
