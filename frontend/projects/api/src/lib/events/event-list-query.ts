import { EventAttendance } from '../content/event-attendance';
import { EventListTab } from './event-list-tab';

/** What to list: a tab, the filters on it and, for a batch after the first, where it starts. */
export interface EventListQuery {
  readonly tab: EventListTab;
  readonly format: EventAttendance | null;
  /** A topic slug, or null for any topic. */
  readonly topic: string | null;
  /** A host slug, or null for any host. */
  readonly host: string | null;
  /** Only events with a recording attached; meaningful on the Past tab. */
  readonly recording: boolean;
  readonly cursor: string | null;
}
