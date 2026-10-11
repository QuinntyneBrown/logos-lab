import { InjectionToken } from '@angular/core';
import { SearchApi } from './search-api';

export const SEARCH_API = new InjectionToken<SearchApi>('SearchApi');
