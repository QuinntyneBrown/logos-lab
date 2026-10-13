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
}

/** Times are in the viewer's zone, named in the generic short form ("ET"). */
export function toEventListingRow(event: EventListItem, locale: string): EventListingRow {
  const base = toEventRow(event, locale);
  const when = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'shortGeneric',
  }).formatRange(new Date(event.startsAt), new Date(event.endsAt));
  return { ...base, when, where: where(event, locale) };
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
