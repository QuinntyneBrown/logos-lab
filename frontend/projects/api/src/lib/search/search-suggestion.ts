import { SearchSuggestionKind } from './search-suggestion-kind';
import { TextSegment } from './text-segment';

/** One suggestion for a partial query. */
export interface SearchSuggestion {
  readonly kind: SearchSuggestionKind;
  readonly slug: string;
  readonly label: readonly TextSegment[];
  /** Topics: how many published items they hold. */
  readonly itemCount?: number;
}
