/** What the reset-password card shows. */
export type ResetPasswordState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'ready'; readonly email: string }
  | { readonly kind: 'expired' };
