import { PopularTopic } from './popular-topic';
import { SearchResultCount } from './search-result-count';
import { SearchResultGroup } from './search-result-group';
import { SearchSource } from './search-source';

/** GET /api/v1/search: the results of a query (detailed design discovery/search-content). */
export interface SearchResults {
  /** The query the results are for; the corrected one when the API corrected it. */
  readonly query: string;
  /** The text as typed, present only when the API searched for a corrected query instead. */
  readonly correctedFrom?: string;
  /** Matches across all types. */
  readonly total: number;
  /** One entry per type with matches, whichever type is selected. */
  readonly counts: readonly SearchResultCount[];
  /** Best match first. Every type with matches, or just the selected one. */
  readonly groups: readonly SearchResultGroup[];
  /** Parts of the index that were not searched. */
  readonly unavailable: readonly SearchSource[];
  /** The most popular topics; present only when nothing matched. */
  readonly popularTopics: readonly PopularTopic[];
}
