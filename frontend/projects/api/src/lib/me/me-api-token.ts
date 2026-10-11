import { InjectionToken } from '@angular/core';
import { MeApi } from './me-api';

export const ME_API = new InjectionToken<MeApi>('MeApi');
