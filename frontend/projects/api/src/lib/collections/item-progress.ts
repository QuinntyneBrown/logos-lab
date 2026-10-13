import { ItemProgressState } from './item-progress-state';

/** A member's progress through one item of a collection. */
export interface ItemProgress {
  readonly itemId: string;
  readonly state: ItemProgressState;
  /** How far through an in-progress item, 0 to 100. */
  readonly percent?: number | null;
  /** The score and pass mark, in percent, of a scored item that was not passed. */
  readonly score?: number | null;
  readonly passMark?: number | null;
}
