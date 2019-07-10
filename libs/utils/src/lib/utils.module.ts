import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { sentryDsn } from '@env';
import * as Sentry from '@sentry/browser';

// Analytics
const providers: any[] = [];

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

if (sentryDsn) {
  Sentry.init({
    dsn: 'https://2ef084dd8ff947e0943115d949f3adcf@sentry.io/1501525'
  });
  providers.push({ provide: ErrorHandler, useClass: SentryErrorHandler });
}

@NgModule({
  declarations: [],
  exports: [],
  providers
})
export class UtilsModule {
}
