import { Observable } from 'rxjs';
import { SearchSuggestions } from './search-suggestions';

/** Site search (detailed design discovery/search-content). */
export interface SearchApi {
  suggest(query: string): Observable<SearchSuggestions>;
}
