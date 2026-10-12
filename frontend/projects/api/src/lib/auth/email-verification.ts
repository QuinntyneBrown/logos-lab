/** The address and member a verification link belongs to (GET /api/v1/auth/email-verifications/{token}). */
export interface EmailVerification {
  readonly email: string;
  readonly displayName: string;
}
