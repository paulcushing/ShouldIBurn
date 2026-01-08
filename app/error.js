"use client";
import * as Sentry from "@sentry/nextjs";

export default function Error({ error, reset }) {
  if (error) {
    Sentry.captureException(error);
  }
  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong</h2>
      <p>{error?.message || "An unexpected error occurred."}</p>
      <button onClick={() => reset()} style={{ marginTop: 12 }}>Try again</button>
    </div>
  );
}
