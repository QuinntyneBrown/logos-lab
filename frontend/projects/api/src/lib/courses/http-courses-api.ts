import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseOverview } from './course-overview';
import { CoursesApi } from './courses-api';
import { EnrolmentResult } from './enrolment-result';
import { LeaveResult } from './leave-result';
import { MyCourseState } from './my-course-state';

@Injectable()
export class HttpCoursesApi implements CoursesApi {
  private readonly http = inject(HttpClient);

  getCourse(slug: string): Observable<CourseOverview> {
    return this.http.get<CourseOverview>(this.courseUrl(slug));
  }

  getMyCourseState(slug: string): Observable<MyCourseState> {
    return this.http.get<MyCourseState>(`${this.courseUrl(slug)}/me`);
  }

  enrol(slug: string): Observable<EnrolmentResult> {
    return this.http.post<EnrolmentResult>(`${this.courseUrl(slug)}/enrolment`, null);
  }

  leave(slug: string): Observable<LeaveResult> {
    return this.http.delete<LeaveResult>(`${this.courseUrl(slug)}/enrolment`);
  }

  private courseUrl(slug: string): string {
    return `/api/v1/courses/${encodeURIComponent(slug)}`;
  }
}
