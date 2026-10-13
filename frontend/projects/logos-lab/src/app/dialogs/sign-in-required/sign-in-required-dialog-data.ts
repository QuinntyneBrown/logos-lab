/** What the sign-in prompt says, and where signing in comes back to. */
export interface SignInRequiredDialogData {
  /** "Sign in to follow Dr. Abena Mensah". */
  readonly title: string;
  readonly description: string;
  /** A same-site path: the page the prompt was opened on. */
  readonly returnUrl: string;
}
