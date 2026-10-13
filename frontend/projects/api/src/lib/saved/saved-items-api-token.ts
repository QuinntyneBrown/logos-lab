import { InjectionToken } from '@angular/core';
import { SavedItemsApi } from './saved-items-api';

export const SAVED_ITEMS_API = new InjectionToken<SavedItemsApi>('SavedItemsApi');
