/** POST /api/v1/auth/sessions. */
export interface SignInRequest {
  readonly email: string;
  readonly password: string;
  readonly returnUrl: string;
}
