import { ExpertDirectory } from '@logos-lab/api';

/** What the directory is showing for the address it was opened with. */
export type ExpertsState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly directory: ExpertDirectory }
  | { readonly kind: 'failed' };
