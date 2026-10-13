import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowResult } from './follow-result';
import { FollowsApi } from './follows-api';

@Injectable()
export class HttpFollowsApi implements FollowsApi {
  private readonly http = inject(HttpClient);

  followExpert(expertId: string): Observable<FollowResult> {
    return this.http.put<FollowResult>(this.expertUrl(expertId), null);
  }

  unfollowExpert(expertId: string): Observable<FollowResult> {
    return this.http.delete<FollowResult>(this.expertUrl(expertId));
  }

  private expertUrl(expertId: string): string {
    return `/api/v1/me/follows/experts/${encodeURIComponent(expertId)}`;
  }
}
