import { TextSegment } from '@logos-lab/api';

/** One expert hit as the page shows it. */
export interface SearchExpertView {
  readonly name: string;
  readonly path: string;
  readonly photoUrl: string | null;
  readonly headline: readonly TextSegment[];
  /** "7 items", after the headline. */
  readonly itemsLabel: string;
}
