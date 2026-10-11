import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AUTH_API,
  HOME_API,
  HttpAuthApi,
  HttpHomeApi,
  HttpMeApi,
  HttpPreferencesApi,
  ME_API,
  PREFERENCES_API,
} from '@logos-lab/api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { provide: HOME_API, useClass: HttpHomeApi },
    { provide: ME_API, useClass: HttpMeApi },
    { provide: AUTH_API, useClass: HttpAuthApi },
    { provide: PREFERENCES_API, useClass: HttpPreferencesApi },
  ],
};
