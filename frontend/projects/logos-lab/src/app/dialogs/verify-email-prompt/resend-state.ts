/** Where "Resend email" stands in the verify-email prompt. */
export type ResendState =
  | { readonly kind: 'idle' }
  | { readonly kind: 'sending' }
  /** A new link went out; the next may be asked for at `until`. */
  | { readonly kind: 'sent'; readonly until: Date }
  /** Asked too soon: the next may be asked for at `until`. */
  | { readonly kind: 'waiting'; readonly until: Date }
  /** Five emails in a day: no more until `until`. */
  | { readonly kind: 'daily-limit'; readonly until: Date }
  | { readonly kind: 'failed' };
