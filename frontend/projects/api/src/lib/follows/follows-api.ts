import { Observable } from 'rxjs';
import { FollowResult } from './follow-result';

/** What a member follows (detailed design experts/follow-expert). */
export interface FollowsApi {
  /** Follows an expert. Idempotent. A `429` carries `Retry-After` when the member is going too fast. */
  followExpert(expertId: string): Observable<FollowResult>;
  /** Stops following an expert. Idempotent. */
  unfollowExpert(expertId: string): Observable<FollowResult>;
}
