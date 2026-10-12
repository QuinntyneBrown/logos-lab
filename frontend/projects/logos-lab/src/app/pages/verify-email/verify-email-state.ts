import { EmailVerification } from '@logos-lab/api';

/** What the verify-email card shows. */
export type VerifyEmailState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'ready'; readonly verification: EmailVerification }
  | { readonly kind: 'verified'; readonly verification: EmailVerification }
  | { readonly kind: 'expired'; readonly email: string | null }
  | {
      readonly kind: 'sent';
      readonly sentTo: string;
      readonly sentAt: Date;
      readonly remainingToday: number;
    };
