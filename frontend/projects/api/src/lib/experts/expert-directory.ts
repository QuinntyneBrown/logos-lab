import { ExpertListing } from './expert-listing';
import { ExpertTopicOption } from './expert-topic-option';

/** GET /api/v1/experts: one page of the directory (detailed design experts/browse-experts). */
export interface ExpertDirectory {
  /** At most 24, by surname. */
  readonly experts: readonly ExpertListing[];
  /** Experts that match the search and topic. */
  readonly total: number;
  /** All experts, whatever the search and topic. */
  readonly totalExperts: number;
  readonly page: number;
  readonly pageCount: number;
  /** The options of the topic select. */
  readonly topics: readonly ExpertTopicOption[];
}
