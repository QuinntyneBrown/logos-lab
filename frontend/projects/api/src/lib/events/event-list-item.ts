import { EventSummary } from '../home/event-summary';

/** One event in the events list: what the home page knows of it, and who hosts it. */
export interface EventListItem extends EventSummary {
  /** The hosts' names, in the order the event gives them. */
  readonly hosts: readonly string[];
}
