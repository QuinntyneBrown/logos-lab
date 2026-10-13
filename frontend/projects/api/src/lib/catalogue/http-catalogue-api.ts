import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogueApi } from './catalogue-api';
import { CataloguePage } from './catalogue-page';
import { CatalogueQuery } from './catalogue-query';

@Injectable()
export class HttpCatalogueApi implements CatalogueApi {
  private readonly http = inject(HttpClient);

  browse(query: CatalogueQuery): Observable<CataloguePage> {
    // Only what differs from the defaults is sent, so the request matches the page's address.
    const params: Record<string, string | readonly string[]> = {};
    if (query.types.length) params['type'] = query.types;
    if (query.topics.length) params['topic'] = query.topics;
    if (query.levels.length) params['level'] = query.levels;
    if (query.contributors.length) params['contributor'] = query.contributors;
    if (query.durations.length) params['duration'] = query.durations;
    if (query.sort !== 'newest') params['sort'] = query.sort;
    if (query.page > 1) params['page'] = String(query.page);
    return this.http.get<CataloguePage>('/api/v1/catalogue', { params });
  }
}
