import { Observable } from 'rxjs';
import { SignInRequest } from './sign-in-request';
import { SignInResult } from './sign-in-result';

/** Signing in and out (detailed designs accounts/sign-in and accounts/manage-sessions). */
export interface AuthApi {
  /**
   * POST /api/v1/auth/sessions. Fails with an `HttpErrorResponse`: 401 `invalid-credentials`,
   * 403 `account-suspended` or `account-deactivated`, 429 with `Retry-After`.
   */
  signIn(request: SignInRequest): Observable<SignInResult>;

  /** DELETE /api/v1/auth/session: ends the current session and clears its cookie. */
  signOut(): Observable<void>;
}
