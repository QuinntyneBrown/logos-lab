import { ContentSummary } from '../content/content-summary';

/** One visible item of a collection, with the curator's note when there is one. */
export interface CollectionItem extends ContentSummary {
  readonly note?: string | null;
}
