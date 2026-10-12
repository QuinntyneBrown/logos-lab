/** Why the second step could not go ahead: paused after too many codes, or the API failed. */
export type SignInVerifyFailure =
  { readonly kind: 'paused'; readonly until: Date } | { readonly kind: 'unavailable' };
