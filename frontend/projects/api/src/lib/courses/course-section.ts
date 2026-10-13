import { CourseLesson } from './course-lesson';

/** One section of a course, with its lessons in order. */
export interface CourseSection {
  readonly id: string;
  readonly title: string;
  readonly lessons: readonly CourseLesson[];
}
