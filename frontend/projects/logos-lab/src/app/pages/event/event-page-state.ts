import { EventPageModel } from '@logos-lab/api';

/** What the event page is showing for the event's address. */
export type EventPageState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly event: EventPageModel }
  | { readonly kind: 'not-found' }
  | { readonly kind: 'failed' };
