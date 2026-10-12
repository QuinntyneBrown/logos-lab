import { SearchSuggestion } from './search-suggestion';

/** GET /api/v1/search/suggestions: up to 6 suggestions. */
export interface SearchSuggestions {
  readonly suggestions: readonly SearchSuggestion[];
}
