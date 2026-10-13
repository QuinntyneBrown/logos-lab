import { SearchResultType } from '@logos-lab/api';
import { SearchExpertView } from './search-expert-view';
import { SearchHitView } from './search-hit-view';

/** One result group as the page shows it. */
export interface SearchGroupView {
  readonly type: SearchResultType;
  /** The heading's id, which names the region. */
  readonly headingId: string;
  readonly title: string;
  readonly count: number;
  /** "All 14 courses", present when the group holds more than the hits shown. */
  readonly moreLabel: string | null;
  readonly moreQueryParams: { readonly q: string; readonly type: SearchResultType };
  readonly hits: readonly SearchHitView[];
  readonly experts: readonly SearchExpertView[];
}
