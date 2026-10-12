import { Observable } from 'rxjs';
import { EmailVerification } from './email-verification';
import { PasswordResetLink } from './password-reset-link';
import { RegisterRequest } from './register-request';
import { ResendResult } from './resend-result';
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

  /**
   * POST /api/v1/auth/email-verifications: 204 makes the account Active and uses the link up. Fails
   * with 410 `link-expired` for an expired, used or unknown link.
   */
  confirmEmail(token: string): Observable<void>;

  /**
   * POST /api/v1/auth/email-verifications/resend for the signed-in Unverified member. Fails with 429
   * and `Retry-After` within 60 seconds of the last email or past 5 emails in 24 hours.
   */
  resendVerification(): Observable<ResendResult>;

  /**
   * POST /api/v1/auth/email-verifications/resend with an expired link's token: sends a new link and
   * makes earlier ones stop working. Fails with 429 and `Retry-After` within 60 seconds of the last
   * email or past 5 emails in 24 hours.
   */
  resendVerificationForToken(token: string): Observable<ResendResult>;

  /**
   * POST /api/v1/auth/password-resets: 202 for every well-formed address, whether or not an account
   * exists, and past the hourly limit (L2-011 AC1, AC5).
   */
  requestPasswordReset(email: string): Observable<void>;

  /**
   * POST /api/v1/auth/password-resets/validations: checks a reset link without using it. Fails with
   * 410 `link-invalid` for an expired, used or tampered link.
   */
  checkPasswordResetLink(token: string): Observable<PasswordResetLink>;

  /**
   * POST /api/v1/auth/password-resets/completions: sets the new password, ends every session and
   * emails a confirmation. Fails with 410 `link-invalid`, or 422 with
   * `errors: [{ field: 'newPassword', code: 'breached' | 'same-as-current' }]`.
   */
  completePasswordReset(token: string, newPassword: string): Observable<void>;

  /** DELETE /api/v1/auth/session: ends the current session and clears its cookie. */
  signOut(): Observable<void>;
}
