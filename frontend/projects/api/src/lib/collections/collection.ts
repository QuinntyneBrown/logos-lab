import { ContentAuthor } from '../content/content-author';
import { CollectionItem } from './collection-item';

/** GET /api/v1/collections/{slug}: a published collection (detailed design collections/view-collection). */
export interface Collection {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly coverUrl: string | null;
  /** An expert, or Logos Lab. */
  readonly curator: ContentAuthor;
  /** The visible items in position order: archived and hidden ones are already left out. */
  readonly items: readonly CollectionItem[];
  readonly itemCount: number;
  /** The estimated total length in minutes; `null` when no item has a length. */
  readonly totalMinutes: number | null;
  /** The day it last changed, as `YYYY-MM-DD`. */
  readonly updatedAt: string;
  readonly followerCount: number;
  /** Whether the signed-in member follows it; `false` for a visitor. */
  readonly following: boolean;
}
