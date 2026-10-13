import { ContentAuthor } from './content-author';
import { ContentType } from './content-type';
import { EventAttendance } from './event-attendance';
import { TopicReference } from './topic-reference';

/** A published item as lists and grids show it. Type-specific facts are present for that type. */
export interface ContentSummary {
  readonly id: string;
  readonly type: ContentType;
  readonly title: string;
  readonly slug: string;
  readonly author: ContentAuthor;
  readonly coverUrl?: string | null;
  readonly topic?: TopicReference;
  /** Courses. */
  readonly lessonCount?: number;
  /** Courses and modules. */
  readonly durationMinutes?: number;
  /** Modules with a pass mark. */
  readonly scored?: boolean;
  /** Videos. */
  readonly durationSeconds?: number;
  readonly freePreview?: boolean;
  /** Articles. */
  readonly readingMinutes?: number;
  /** Collections. */
  readonly itemCount?: number;
  /** Events. */
  readonly startsAt?: string;
  readonly attendance?: EventAttendance;
  /** Whether the signed-in member saved it; absent for a visitor. */
  readonly saved?: boolean;
}
