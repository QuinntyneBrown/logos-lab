import { CataloguePage } from '@logos-lab/api';

/** What the explore page is showing for the address it was opened with. */
export type ExploreState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly page: CataloguePage }
  | { readonly kind: 'failed' };
