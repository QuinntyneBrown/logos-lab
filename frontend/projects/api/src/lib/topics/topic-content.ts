import { ContentSummary } from '../content/content-summary';

/** GET /api/v1/topics/{slug}/content: one page of the topic's items, newest first. */
export interface TopicContent {
  /** At most 24. */
  readonly items: readonly ContentSummary[];
  readonly total: number;
  readonly page: number;
  readonly pageCount: number;
}
