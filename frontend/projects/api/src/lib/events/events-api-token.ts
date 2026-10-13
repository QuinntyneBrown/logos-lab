import { InjectionToken } from '@angular/core';
import { EventsApi } from './events-api';

export const EVENTS_API = new InjectionToken<EventsApi>('EventsApi');
