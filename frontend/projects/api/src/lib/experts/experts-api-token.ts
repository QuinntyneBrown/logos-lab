import { InjectionToken } from '@angular/core';
import { ExpertsApi } from './experts-api';

export const EXPERTS_API = new InjectionToken<ExpertsApi>('ExpertsApi');
