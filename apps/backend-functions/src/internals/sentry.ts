import { init as SentryInit, captureException } from '@sentry/node';
import { sentryDsn } from '../environments/environment';

if (sentryDsn) {
  SentryInit({ dsn: sentryDsn });
}

/**
 * Decorate a function to catch & log errors with sentry,
 * IF sentry was loaded.
 *
 * We have to use this function explicitly instead of sentry's catch-all
 * logger: firebase functions do not allow for error handler override
 * as of today (2019-07-02).
 */
export function logErrors(f: any): any {
  return (...args: any[]) => {
    try {
      return f(...args);
    } catch (err) {
      // Send the exception to sentry IF we have a configuration.
      if (sentryDsn) {
        captureException(err);
      }
      throw err;
    }
  };
}
