import { InjectionToken } from '@angular/core';
import { FollowsApi } from './follows-api';

export const FOLLOWS_API = new InjectionToken<FollowsApi>('FollowsApi');
