import { ContentSummary } from '../content/content-summary';
import { TextSegment } from './text-segment';

/** One matching item and the excerpt that matched, with the matched words marked. */
export interface SearchContentHit {
  readonly item: ContentSummary;
  readonly snippet: readonly TextSegment[];
}
