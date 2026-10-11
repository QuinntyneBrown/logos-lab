import { HomePageView } from '@logos-lab/api';

/** Where the home page's request for its sections stands. */
export type HomeState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly view: HomePageView }
  | { readonly kind: 'failed' };
