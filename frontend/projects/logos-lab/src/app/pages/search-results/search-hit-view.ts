import { TextSegment } from '@logos-lab/api';
import { ContentCardView } from '../../content/content-card-view';

/** One content hit as the page shows it: a card and the excerpt to project into it. */
export interface SearchHitView {
  readonly card: ContentCardView;
  readonly snippet: readonly TextSegment[];
}
