import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchApi } from './search-api';
import { SearchResultType } from './search-result-type';
import { SearchResults } from './search-results';
import { SearchSuggestions } from './search-suggestions';

@Injectable()
export class HttpSearchApi implements SearchApi {
  private readonly http = inject(HttpClient);

  search(query: string, type?: SearchResultType): Observable<SearchResults> {
    const params: Record<string, string> = type ? { q: query, type } : { q: query };
    return this.http.get<SearchResults>('/api/v1/search', { params });
  }

  suggest(query: string): Observable<SearchSuggestions> {
    return this.http.get<SearchSuggestions>('/api/v1/search/suggestions', { params: { q: query } });
  }
}
