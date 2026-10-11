import { EventAttendance } from '../content/event-attendance';

/** An upcoming event on the home page. */
export interface EventSummary {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly attendance: EventAttendance;
  readonly venue: string | null;
  readonly registeredCount: number;
  readonly placesLeft: number | null;
  readonly full: boolean;
  readonly waitlistOpen: boolean;
}
