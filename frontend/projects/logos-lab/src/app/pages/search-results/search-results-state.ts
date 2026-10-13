import { SearchResults } from '@logos-lab/api';

/** What the results page is showing for the address it was opened with. */
export type SearchResultsState =
  | { readonly kind: 'empty' }
  | { readonly kind: 'invalid' }
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly results: SearchResults }
  | { readonly kind: 'failed' };
