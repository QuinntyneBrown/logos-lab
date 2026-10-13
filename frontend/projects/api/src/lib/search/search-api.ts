import { Observable } from 'rxjs';
import { SearchResults } from './search-results';
import { SearchResultType } from './search-result-type';
import { SearchSuggestions } from './search-suggestions';

/** Site search (detailed design discovery/search-content). */
export interface SearchApi {
  /** The results of a query, for every type or just one. */
  search(query: string, type?: SearchResultType): Observable<SearchResults>;
  suggest(query: string): Observable<SearchSuggestions>;
}
