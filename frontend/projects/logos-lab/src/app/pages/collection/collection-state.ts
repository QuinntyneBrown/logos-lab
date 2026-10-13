import { Collection } from '@logos-lab/api';

/** What the collection page is showing for the collection's address. */
export type CollectionState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly collection: Collection }
  | { readonly kind: 'not-found' }
  | { readonly kind: 'failed' };
