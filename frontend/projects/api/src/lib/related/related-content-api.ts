import { Observable } from 'rxjs';
import { ContentSummary } from '../content/content-summary';

/** Items related to a piece of content (detailed design articles/show-related-content). */
export interface RelatedContentApi {
  /** Up to 4 published items, pinned ones first, then by shared topics and recency. */
  getRelated(contentId: string): Observable<readonly ContentSummary[]>;
}
