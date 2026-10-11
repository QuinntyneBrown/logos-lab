import { Observable } from 'rxjs';
import { RegisterRequest } from './register-request';
import { SignInRequest } from './sign-in-request';
import { SignInResult } from './sign-in-result';

/** Registering, signing in and out (detailed designs accounts/register-account, sign-in, manage-sessions). */
export interface AuthApi {
  /**
   * POST /api/v1/auth/sessions. Fails with an `HttpErrorResponse`: 401 `invalid-credentials`,
   * 403 `account-suspended` or `account-deactivated`, 429 with `Retry-After`.
   */
  signIn(request: SignInRequest): Observable<SignInResult>;

  /**
   * POST /api/v1/auth/registrations: 202 for a new and an existing address alike. Fails with 422
   * (field errors, such as a breached password) or 429 with `Retry-After`.
   */
  register(request: RegisterRequest): Observable<void>;

  /** DELETE /api/v1/auth/session: ends the current session and clears its cookie. */
  signOut(): Observable<void>;
}
