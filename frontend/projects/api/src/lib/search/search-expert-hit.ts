import { TextSegment } from './text-segment';

/** One matching expert and their headline, with the matched words marked. */
export interface SearchExpertHit {
  readonly slug: string;
  readonly name: string;
  readonly photoUrl?: string | null;
  readonly headline: readonly TextSegment[];
  readonly itemCount: number;
}
