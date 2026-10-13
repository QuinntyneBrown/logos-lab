import { Observable } from 'rxjs';
import { SearchOptions } from './search-options';
import { SearchResults } from './search-results';
import { SearchSuggestions } from './search-suggestions';

/** Site search (detailed design discovery/search-content). */
export interface SearchApi {
  /** The results of a query, for every type or just one. */
  search(query: string, options?: SearchOptions): Observable<SearchResults>;
  suggest(query: string): Observable<SearchSuggestions>;
}
