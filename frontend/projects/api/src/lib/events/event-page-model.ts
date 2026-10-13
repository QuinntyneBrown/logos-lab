import { EventAttendance } from '../content/event-attendance';
import { TopicReference } from '../content/topic-reference';
import { EventAgendaItem } from './event-agenda-item';
import { EventCancellation } from './event-cancellation';
import { EventHost } from './event-host';
import { EventTimeChange } from './event-time-change';
import { EventVenue } from './event-venue';

/** A published event as its page shows it to anyone; it never holds the join link. */
export interface EventPageModel {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  /** Paragraphs of plain text. */
  readonly description: readonly string[];
  readonly attendance: EventAttendance;
  readonly startsAt: string;
  readonly endsAt: string;
  /** The IANA zone the host scheduled the event in. */
  readonly timeZone: string;
  readonly hosts: readonly EventHost[];
  readonly topics: readonly TopicReference[];
  /** The timed items of the event, in order; empty for an event with no agenda. */
  readonly agenda: readonly EventAgendaItem[];
  /** Where it happens; `null` for an online event. */
  readonly venue: EventVenue | null;
  readonly registeredCount: number;
  /** The most people it takes; `null` when there is no limit. */
  readonly capacity: number | null;
  /** How many people are waiting for a place. */
  readonly waitlistCount: number;
  /** Nobody can register after this; `null` when registration stays open until the start. */
  readonly registrationClosesAt: string | null;
  /** Set once the event is cancelled. */
  readonly cancellation: EventCancellation | null;
  /** Set when the time moved after the event was published. */
  readonly change: EventTimeChange | null;
}
