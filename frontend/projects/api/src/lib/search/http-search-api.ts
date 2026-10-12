import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchApi } from './search-api';
import { SearchSuggestions } from './search-suggestions';

@Injectable()
export class HttpSearchApi implements SearchApi {
  private readonly http = inject(HttpClient);

  suggest(query: string): Observable<SearchSuggestions> {
    return this.http.get<SearchSuggestions>('/api/v1/search/suggestions', { params: { q: query } });
  }
}
