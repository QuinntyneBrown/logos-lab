import { CollectionProgress } from '@logos-lab/api';

/** What the page knows of the member's progress: nothing yet or for a visitor, it, or that it failed. */
export type ProgressState =
  | { readonly kind: 'none' }
  | { readonly kind: 'loaded'; readonly progress: CollectionProgress }
  | { readonly kind: 'failed' };
