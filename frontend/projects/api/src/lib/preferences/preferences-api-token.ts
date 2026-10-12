import { InjectionToken } from '@angular/core';
import { PreferencesApi } from './preferences-api';

export const PREFERENCES_API = new InjectionToken<PreferencesApi>('PreferencesApi');
