import { EventAttendance } from '../content/event-attendance';
import { TopicReference } from '../content/topic-reference';
import { EventHost } from './event-host';

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
}
