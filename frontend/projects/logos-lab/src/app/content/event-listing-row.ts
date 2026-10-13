import { EventListItem } from '@logos-lab/api';
import { toEventRow } from './event-row-view';

/** The inputs and side text of an event row on the events page. */
export interface EventListingRow {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly datetime: string;
  readonly day: string;
  readonly month: string;
  readonly when: string;
  readonly where: string;
  readonly online: boolean;
  readonly going: string | null;
  readonly full: boolean;
  readonly past: boolean;
  readonly happeningNow: boolean;
  readonly hasRecording: boolean;
  readonly registered: boolean;
  /** "Full · you're number 3 on the waitlist" for a member waiting on a place. */
  readonly waitlist: string | null;
}

/** Times are in the viewer's zone, named in the generic short form ("ET"). */
export function toEventListingRow(
  event: EventListItem,
  locale: string,
  now: Date,
  past: boolean,
): EventListingRow {
  const base = toEventRow(event, locale);
  const start = new Date(event.startsAt);
  const range = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'shortGeneric',
  }).formatRange(start, new Date(event.endsAt));
  const when = past
    ? $localize`:@@events.ended:${endedOn(start, locale)}:date: · ended`
    : event.happeningNow
      ? `${range} · ${startedAgo(start, now, locale)}`
      : range;
  const position = event.registration?.waitlistPosition;
  return {
    ...base,
    when,
    where: where(event, locale),
    // Capacity shows only when it is limited; an open event has no count to give.
    going: event.placesLeft === null ? null : base.going,
    past,
    happeningNow: event.happeningNow,
    hasRecording: event.hasRecording,
    registered: event.registration?.status === 'registered',
    waitlist:
      event.registration?.status === 'waitlisted' && position
        ? $localize`:@@events.waitlisted:Full · you're number ${new Intl.NumberFormat(locale).format(position)}:position: on the waitlist`
        : null,
  };
}

/** "Thu, Sep 24, 2026": a past event shows the day it was held, not its hours. */
function endedOn(start: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(start);
}

/** "started 20 minutes ago", worked out when the list was made. */
function startedAgo(start: Date, now: Date, locale: string): string {
  const minutes = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 60000));
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const ago =
    minutes < 60
      ? relative.format(-minutes, 'minute')
      : relative.format(-Math.floor(minutes / 60), 'hour');
  return $localize`:@@events.startedAgo:started ${ago}:ago:`;
}

/** "Hybrid · online and in Ottawa · hosted by Rev. Dr. Thomas Hale". */
function where(event: EventListItem, locale: string): string {
  const parts: string[] = [];
  switch (event.attendance) {
    case 'online':
      parts.push($localize`:@@events.format.online:Online`);
      break;
    case 'hybrid':
      parts.push($localize`:@@events.format.hybrid:Hybrid`);
      parts.push(
        event.venue
          ? $localize`:@@events.where.hybrid:online and in ${event.venue}:venue:`
          : $localize`:@@events.where.hybridNoVenue:online and in person`,
      );
      break;
    default:
      parts.push($localize`:@@events.format.inPerson:In person`);
      if (event.venue) parts.push(event.venue);
  }
  if (event.hosts.length) {
    const names = new Intl.ListFormat(locale, { type: 'conjunction' }).format(event.hosts);
    parts.push($localize`:@@events.hostedBy:hosted by ${names}:hosts:`);
  }
  return parts.join(' · ');
}
