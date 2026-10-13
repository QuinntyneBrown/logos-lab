import { ExpertContent } from '@logos-lab/api';

/** What the published-items panel is showing for the selected tab. */
export type ExpertContentState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly content: ExpertContent }
  | { readonly kind: 'failed' };
