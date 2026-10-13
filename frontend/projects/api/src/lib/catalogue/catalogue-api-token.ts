import { InjectionToken } from '@angular/core';
import { CatalogueApi } from './catalogue-api';

export const CATALOGUE_API = new InjectionToken<CatalogueApi>('CatalogueApi');
