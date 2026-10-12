/** What the reset-password card shows. */
export type ResetPasswordState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'ready'; readonly email: string }
  | { readonly kind: 'expired' }
  /** The link could not be checked; "Try again" checks it again. */
  | { readonly kind: 'unchecked' }
  | { readonly kind: 'changed'; readonly email: string };
