import { ExpertProfile } from '@logos-lab/api';

/** What the profile page is showing for the expert's address. */
export type ExpertProfileState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly profile: ExpertProfile }
  | { readonly kind: 'not-found' }
  | { readonly kind: 'failed' };
