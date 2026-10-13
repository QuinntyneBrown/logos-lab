import { CourseOutlineLesson } from './course-outline-lesson';

/** One section of the outline: a disclosure holding its lessons. */
export interface CourseOutlineSection {
  readonly id: string;
  /** "3. Image and likeness". */
  readonly name: string;
  /** The visible count: "4 lessons", "1 of 5". */
  readonly countLabel: string;
  /** Hidden text that completes a bare count: "lessons completed". */
  readonly countHint: string | null;
  /** Whether the section starts open. */
  readonly open: boolean;
  readonly lessons: readonly CourseOutlineLesson[];
}
