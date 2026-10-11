/** POST /api/v1/auth/registrations. */
export interface RegisterRequest {
  readonly displayName: string;
  readonly email: string;
  readonly password: string;
  readonly acceptedTerms: boolean;
  readonly marketingConsent: boolean;
}
