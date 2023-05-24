import * as Sentry from '@sentry/react';
import { Replay } from '@sentry/react';

const apiUrl = process.env.REACT_APP_API_URL ?? '';

const initSentry = (): void => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    tracesSampleRate: .5,
    replaysSessionSampleRate: .5,
    replaysOnErrorSampleRate: .5,
    environment: process.env.REACT_APP_ENVIRONMENT,
  })
}

// eslint-disable-next-line no-new
new Replay({
  networkDetailAllowUrls: [window.location.origin, apiUrl],
});

export default initSentry;