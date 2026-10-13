import { SearchResultType } from './search-result-type';

/** How many results of one type match the query, whichever type is selected. */
export interface SearchResultCount {
  readonly type: SearchResultType;
  readonly count: number;
}
