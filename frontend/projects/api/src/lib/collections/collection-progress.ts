import { ItemProgress } from './item-progress';

/** GET /api/v1/me/collections/{collectionId}/progress: the current member's progress. */
export interface CollectionProgress {
  readonly completed: number;
  readonly total: number;
  readonly items: readonly ItemProgress[];
}
