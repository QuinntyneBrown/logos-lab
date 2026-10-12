import { SignInStatus } from './sign-in-status';

/** The password step's outcome: a session, or a second-factor challenge. */
export interface SignInResult {
  readonly status: SignInStatus;
  readonly mfaEnrolmentRequired: boolean;
}
