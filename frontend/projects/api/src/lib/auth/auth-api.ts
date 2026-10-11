import { Observable } from 'rxjs';

/** Signing in and out (detailed designs accounts/sign-in and accounts/manage-sessions). */
export interface AuthApi {
  /** DELETE /api/v1/auth/session: ends the current session and clears its cookie. */
  signOut(): Observable<void>;
}
