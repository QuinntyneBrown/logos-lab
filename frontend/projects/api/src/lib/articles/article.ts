import { TopicReference } from '../content/topic-reference';
import { ArticleContributor } from './article-contributor';
import { ArticleCorrection } from './article-correction';

/** GET /api/v1/articles/{slug}: a published article (detailed design articles/read-article). */
export interface Article {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly coverUrl: string | null;
  readonly coverAlt: string | null;
  readonly contributors: readonly ArticleContributor[];
  /** The day it was published, as `YYYY-MM-DD`. */
  readonly publishedAt: string;
  /** The day it last changed, only when that is after publication. */
  readonly updatedAt: string | null;
  readonly readingMinutes: number;
  /** The body as HTML the server already sanitized to the supported formatting. */
  readonly bodyHtml: string;
  readonly topics: readonly TopicReference[];
  readonly commentCount: number;
  /** Whether the signed-in member saved it; `false` for a visitor. */
  readonly saved: boolean;
  readonly correction: ArticleCorrection | null;
}
