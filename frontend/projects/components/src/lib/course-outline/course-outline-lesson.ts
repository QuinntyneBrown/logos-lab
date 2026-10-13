import { CourseOutlineLessonState } from './course-outline-lesson-state';
import { CourseOutlineLessonType } from './course-outline-lesson-type';

/** One lesson row of the outline; every text arrives translated and formatted. */
export interface CourseOutlineLesson {
  readonly id: string;
  /** "3.2 Representing, not resembling". */
  readonly title: string;
  readonly type: CourseOutlineLessonType;
  /** The type's name: "Video", "Cohort discussion". */
  readonly kind: string;
  /** The short name used when a lesson has no length and the outline is compact: "Cohort". */
  readonly shortKind: string | null;
  /** The formatted length: "6 min"; `null` for a lesson with none. */
  readonly timeLabel: string | null;
  /** "Optional" for an optional lesson. */
  readonly optionalLabel: string | null;
  readonly state: CourseOutlineLessonState;
  /** The lesson the learner is on, or should continue with; independent of `state`. */
  readonly current: boolean;
  /** Hidden text that says the state beyond icon and colour: "completed", "locked: enrol to open". */
  readonly stateLabel: string | null;
  /** The lesson's route; `null` shows the row without a link. */
  readonly path: string | null;
}
