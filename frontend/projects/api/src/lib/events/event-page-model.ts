import { EventAttendance } from '../content/event-attendance';
import { TopicReference } from '../content/topic-reference';
import { EventAgendaItem } from './event-agenda-item';
import { EventHost } from './event-host';
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
}
