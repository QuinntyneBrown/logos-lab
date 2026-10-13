import { CohortSummary } from './cohort-summary';
import { EnrolmentStatus } from './enrolment-status';
import { MyLessonState } from './my-lesson-state';
import { NextLesson } from './next-lesson';

/** GET /api/v1/courses/{slug}/me: the signed-in member's own state in a course. */
export interface MyCourseState {
  readonly status: EnrolmentStatus;
  /** 0 to 100. */
  readonly percent: number;
  readonly completedLessons: number;
  readonly totalLessons: number;
  readonly lessons: readonly MyLessonState[];
  /** The lesson Continue opens; `null` once the course is completed. */
  readonly nextLesson: NextLesson | null;
  readonly cohort: CohortSummary | null;
  /** The code of the certificate, once issued. */
  readonly certificateCode: string | null;
  /** The day the course was completed, as `YYYY-MM-DD`. */
  readonly completedOn: string | null;
}
