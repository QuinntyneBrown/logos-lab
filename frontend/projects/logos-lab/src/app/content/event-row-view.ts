import { EventSummary } from '@logos-lab/api';
import { plural } from './plural';

/** The inputs and side text of an event row for one upcoming event. */
export interface EventRowView {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly datetime: string;
  readonly day: string;
  readonly month: string;
  readonly when: string;
  readonly where: string | null;
  readonly online: boolean;
  readonly going: string | null;
  readonly full: boolean;
}

export function toEventRow(event: EventSummary, locale: string): EventRowView {
  const start = new Date(event.startsAt);
  const number = new Intl.NumberFormat(locale);
  return {
    id: event.id,
    title: event.title,
    path: `/events/${event.slug}`,
    datetime: event.startsAt,
    day: new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(start),
    month: new Intl.DateTimeFormat(locale, { month: 'short' }).format(start),
    when: new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).formatRange(start, new Date(event.endsAt)),
    where: where(event),
    online: event.attendance !== 'in-person',
    going: event.full
      ? null
      : event.placesLeft !== null
        ? plural(locale, event.placesLeft, {
            one: $localize`:@@event.placesLeft.one:${number.format(event.placesLeft)}:count: place left`,
            other: $localize`:@@event.placesLeft.other:${number.format(event.placesLeft)}:count: places left`,
          })
        : $localize`:@@event.registered:${number.format(event.registeredCount)}:count: registered`,
    full: event.full,
  };
}

function where(event: EventSummary): string | null {
  switch (event.attendance) {
    case 'online':
      return $localize`:@@event.attendance.online:Online`;
    case 'hybrid':
      return event.venue
        ? $localize`:@@event.where.hybrid:Online and in ${event.venue}:venue:`
        : $localize`:@@event.attendance.hybrid:Online and in person`;
    default:
      return event.venue;
  }
}
