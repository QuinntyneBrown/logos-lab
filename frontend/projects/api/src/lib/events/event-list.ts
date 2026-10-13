import { EventFilterOption } from './event-filter-option';
import { EventListItem } from './event-list-item';

/** One batch of the events list, with what the filters offer. */
export interface EventList {
  readonly events: readonly EventListItem[];
  /** How many events match the filters in all, not only in this batch. */
  readonly total: number;
  /** How many events the tab holds with no filter on. */
  readonly totalEvents: number;
  /** Asks for the next batch; `null` when this was the last. */
  readonly nextCursor: string | null;
  readonly topics: readonly EventFilterOption[];
  readonly hosts: readonly EventFilterOption[];
}
