import { InjectionToken } from '@angular/core';
import { TopicsApi } from './topics-api';

export const TOPICS_API = new InjectionToken<TopicsApi>('TopicsApi');
