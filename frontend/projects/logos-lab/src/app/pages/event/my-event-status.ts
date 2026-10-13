import { EventViewerState } from '@logos-lab/api';

/** The member's own place in the event, as far as it is known. */
export type MyEventStatus =
  | { readonly kind: 'none' }
  | { readonly kind: 'pending' }
  | { readonly kind: 'loaded'; readonly state: EventViewerState }
  | { readonly kind: 'failed' };
