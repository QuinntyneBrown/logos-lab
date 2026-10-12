import { Observable } from 'rxjs';
import { EmailVerification } from './email-verification';
import { RegisterRequest } from './register-request';
import { SignInRequest } from './sign-in-request';
import { SignInResult } from './sign-in-result';

/**
 * Registering, verifying, signing in and out (detailed designs accounts/register-account,
 * verify-email, sign-in, manage-sessions).
 */
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

  /**
   * GET /api/v1/auth/email-verifications/{token}: looks the link up without using it. Fails with
   * 410 `link-expired` (carrying `email` when the token is known) for an expired, used or unknown link.
   */
  lookUpEmailVerification(token: string): Observable<EmailVerification>;

  /** DELETE /api/v1/auth/session: ends the current session and clears its cookie. */
  signOut(): Observable<void>;
}
