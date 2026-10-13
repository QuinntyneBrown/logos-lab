import { SearchResultType } from './search-result-type';

/** What narrows or shapes a search beyond its query. */
export interface SearchOptions {
  /** Only results of this type. */
  readonly type?: SearchResultType;
  /** Search the query as typed, without spelling correction. */
  readonly exact?: boolean;
}
