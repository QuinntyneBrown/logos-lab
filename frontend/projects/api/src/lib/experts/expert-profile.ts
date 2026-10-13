import { ExpertContentCount } from './expert-content-count';
import { ExpertExpertiseArea } from './expert-expertise-area';
import { ExpertLink } from './expert-link';

/** GET /api/v1/experts/{slug}: an expert's public profile (detailed design experts/view-expert-profile). */
export interface ExpertProfile {
  readonly slug: string;
  readonly name: string;
  readonly photoUrl: string | null;
  /** "Associate Professor of Systematic Theology". */
  readonly title: string;
  /** "Kingsgate Theological College". */
  readonly affiliation: string | null;
  /** The bio as HTML the server already sanitized to paragraphs, bold, italic and links. */
  readonly bioHtml: string;
  readonly followerCount: number;
  /** All published items. */
  readonly itemCount: number;
  readonly expertise: readonly ExpertExpertiseArea[];
  /** At most 5. */
  readonly links: readonly ExpertLink[];
  /** Only types with items, in the order the tabs show them. */
  readonly counts: readonly ExpertContentCount[];
}
