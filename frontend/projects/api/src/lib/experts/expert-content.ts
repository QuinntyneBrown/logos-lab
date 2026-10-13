import { ContentSummary } from '../content/content-summary';

/** GET /api/v1/experts/{slug}/content: one page of an expert's items of one type. */
export interface ExpertContent {
  /** At most 24. */
  readonly items: readonly ContentSummary[];
  readonly total: number;
  readonly page: number;
  readonly pageCount: number;
}
