import { Observable } from 'rxjs';
import { CourseOverview } from './course-overview';
import { EnrolmentResult } from './enrolment-result';
import { LeaveResult } from './leave-result';
import { MyCourseState } from './my-course-state';

/** Courses (detailed designs courses/view-course-overview and enrol-in-course). */
export interface CoursesApi {
  /** A course, or a `404` error for a slug that is not visible to the viewer. */
  getCourse(slug: string): Observable<CourseOverview>;
  /** The signed-in member's state in the course. */
  getMyCourseState(slug: string): Observable<MyCourseState>;
  /** Enrols the member. Idempotent. A `403` problem `email-unverified` means the email is not verified. */
  enrol(slug: string): Observable<EnrolmentResult>;
  /** Leaves the course; the progress is kept for 12 months. */
  leave(slug: string): Observable<LeaveResult>;
}
