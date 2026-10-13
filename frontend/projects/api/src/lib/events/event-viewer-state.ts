import { EventRegistration } from './event-registration';

/** What only the signed-in caller may know about an event: their own place in it. */
export interface EventViewerState {
  /** The caller's place; `null` when they have not registered. */
  readonly registration: EventRegistration | null;
}
