import { LessonState } from './lesson-state';

/** The member's state for one lesson. */
export interface MyLessonState {
  readonly lessonId: string;
  readonly state: LessonState;
}
