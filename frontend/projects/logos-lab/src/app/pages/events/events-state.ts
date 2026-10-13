import { EventList } from '@logos-lab/api';

/** What the events page is showing for the address it was opened with. */
export type EventsState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly list: EventList }
  | { readonly kind: 'failed' };
