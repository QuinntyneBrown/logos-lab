import { Topic } from '@logos-lab/api';

/** What the topic page is showing for the topic's address. */
export type TopicState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly topic: Topic }
  | { readonly kind: 'not-found' }
  | { readonly kind: 'failed' };
