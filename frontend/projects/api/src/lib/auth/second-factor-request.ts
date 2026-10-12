/** The second sign-in step: a code from the authenticator app, or one of the recovery codes. */
export type SecondFactorRequest = { readonly code: string } | { readonly recoveryCode: string };
