import { ContentAuthor } from '../content/content-author';
import { TopicReference } from '../content/topic-reference';
import { CourseLevel } from './course-level';
import { CourseNavigation } from './course-navigation';
import { CourseSection } from './course-section';

/** GET /api/v1/courses/{slug}: what anyone may see of a course (detailed design courses/view-course-overview). */
export interface CourseOverview {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly coverUrl: string | null;
  /** Experts, or Logos Lab. */
  readonly contributors: readonly ContentAuthor[];
  readonly level: CourseLevel;
  readonly totalMinutes: number;
  /** 3 to 8 outcomes. */
  readonly outcomes: readonly string[];
  readonly topics: readonly TopicReference[];
  readonly navigation: CourseNavigation;
  readonly sections: readonly CourseSection[];
  readonly enrolledCount: number;
  readonly commentCount: number;
  /** Whether the signed-in member saved it; `false` for a visitor. */
  readonly saved: boolean;
  /** The day the course was archived, as `YYYY-MM-DD`; `null` while it is in the catalogue. */
  readonly archivedOn: string | null;
}
