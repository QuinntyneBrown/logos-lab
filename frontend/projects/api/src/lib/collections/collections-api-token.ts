import { InjectionToken } from '@angular/core';
import { CollectionsApi } from './collections-api';

export const COLLECTIONS_API = new InjectionToken<CollectionsApi>('CollectionsApi');
