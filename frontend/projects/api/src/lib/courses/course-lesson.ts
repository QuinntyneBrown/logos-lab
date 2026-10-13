import { LessonKind } from './lesson-kind';

/** One lesson in a course's syllabus. */
export interface CourseLesson {
  readonly id: string;
  readonly title: string;
  readonly kind: LessonKind;
  /** The estimated time in minutes; `null` for a lesson without one, such as a discussion. */
  readonly minutes: number | null;
  readonly optional?: boolean;
}
