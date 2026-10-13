import { InjectionToken } from '@angular/core';
import { ArticlesApi } from './articles-api';

export const ARTICLES_API = new InjectionToken<ArticlesApi>('ArticlesApi');
