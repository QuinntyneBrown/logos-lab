import { TopicContent } from '@logos-lab/api';

/** What the topic page is showing for the page of items it was opened with. */
export type TopicContentState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly content: TopicContent }
  | { readonly kind: 'failed' };
