import * as Sentry from '@sentry/react';

const apiUrl = process.env.REACT_APP_API_URL ?? '';

const initSentry = (): void => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay({
      networkDetailAllowUrls: [window.location.origin, apiUrl],
    })],
    tracesSampleRate: .5,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: .5,
    environment: process.env.REACT_APP_ENVIRONMENT,
  })
}



export default initSentry;