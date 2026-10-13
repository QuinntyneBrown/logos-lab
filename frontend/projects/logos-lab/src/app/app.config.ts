import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AUTH_API,
  ACCOUNT_API,
  CATALOGUE_API,
  EXPERTS_API,
  HOME_API,
  HttpAuthApi,
  HttpAccountApi,
  HttpCatalogueApi,
  HttpExpertsApi,
  HttpHomeApi,
  HttpMeApi,
  HttpPreferencesApi,
  HttpSearchApi,
  HttpTopicsApi,
  ME_API,
  PREFERENCES_API,
  SEARCH_API,
  TOPICS_API,
} from '@logos-lab/api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { provide: ACCOUNT_API, useClass: HttpAccountApi },
    { provide: CATALOGUE_API, useClass: HttpCatalogueApi },
    { provide: EXPERTS_API, useClass: HttpExpertsApi },
    { provide: HOME_API, useClass: HttpHomeApi },
    { provide: ME_API, useClass: HttpMeApi },
    { provide: AUTH_API, useClass: HttpAuthApi },
    { provide: PREFERENCES_API, useClass: HttpPreferencesApi },
    { provide: SEARCH_API, useClass: HttpSearchApi },
    { provide: TOPICS_API, useClass: HttpTopicsApi },
  ],
};
