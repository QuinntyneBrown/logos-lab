import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchApi } from './search-api';
import { SearchOptions } from './search-options';
import { SearchResults } from './search-results';
import { SearchSuggestions } from './search-suggestions';

@Injectable()
export class HttpSearchApi implements SearchApi {
  private readonly http = inject(HttpClient);

  search(query: string, options: SearchOptions = {}): Observable<SearchResults> {
    const params: Record<string, string> = { q: query };
    if (options.type) params['type'] = options.type;
    if (options.exact) params['exact'] = 'true';
    return this.http.get<SearchResults>('/api/v1/search', { params });
  }

  suggest(query: string): Observable<SearchSuggestions> {
    return this.http.get<SearchSuggestions>('/api/v1/search/suggestions', { params: { q: query } });
  }
}
