import { Article } from '@logos-lab/api';

/** What the article page is showing for the article's address. */
export type ArticleState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly article: Article }
  | { readonly kind: 'not-found' }
  | { readonly kind: 'failed' };
