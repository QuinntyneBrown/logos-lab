/** A verification email sent again: where it went and when the next may be asked for. */
export interface ResendResult {
  readonly sentTo: string;
  /** Seconds until "Resend email" turns back on. */
  readonly retryAfterSeconds: number;
  /** How many more emails the account may ask for in the 24 hours. */
  readonly remainingToday: number;
}
