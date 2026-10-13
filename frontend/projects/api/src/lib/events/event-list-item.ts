import { EventSummary } from '../home/event-summary';
import { EventRegistration } from './event-registration';

/** One event in the events list: what the home page knows of it, and who hosts it. */
export interface EventListItem extends EventSummary {
  /** The hosts' names, in the order the event gives them. */
  readonly hosts: readonly string[];
  /** Started and not yet ended when the list was made. */
  readonly happeningNow: boolean;
  /** The caller's place in it; `null` for a visitor or someone who has not registered. */
  readonly registration: EventRegistration | null;
}
