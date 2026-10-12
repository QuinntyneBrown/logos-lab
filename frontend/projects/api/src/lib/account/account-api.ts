import { Observable } from 'rxjs';
import { MemberProfile } from './member-profile';
import { ProfileUpdate } from './profile-update';

/** The signed-in member's own settings (detailed designs under accounts/). */
export interface AccountApi {
  /** GET /api/v1/me/profile. */
  getProfile(): Observable<MemberProfile>;

  /**
   * PUT /api/v1/me/profile: answers with the saved profile. Fails with 422 and
   * `errors: [{ field: 'displayName' | 'bio', code }]`.
   */
  updateProfile(update: ProfileUpdate): Observable<MemberProfile>;
}
