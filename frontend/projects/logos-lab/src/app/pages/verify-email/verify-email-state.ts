import { EmailVerification } from '@logos-lab/api';

/** What the verify-email card shows. */
export type VerifyEmailState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'ready'; readonly verification: EmailVerification };
