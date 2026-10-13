import { EventPageModel } from '@logos-lab/api';
import { eventClockRange, eventDate } from '../../content/event-moment';
import { EventNoticeView } from './event-notice-view';

/** The notice for a cancelled event or a moved time; a cancellation wins. */
export function toEventNotice(
  event: EventPageModel,
  registered: boolean,
  locale: string,
  timeZone: string | undefined,
): EventNoticeView | null {
  if (event.cancellation) {
    return {
      tone: 'danger',
      heading: $localize`:@@eventPage.cancelledNotice.title:This event is cancelled`,
      body: event.cancellation.reason,
      link: {
        label: $localize`:@@eventPage.cancelledNotice.link:See other events`,
        path: '/events',
      },
    };
  }
  const change = event.change;
  if (!change) return null;
  const now = eventClockRange(
    locale,
    new Date(event.startsAt),
    new Date(event.endsAt),
    timeZone,
    true,
  );
  const day = eventDate(locale, new Date(event.startsAt), timeZone);
  const before = eventClockRange(
    locale,
    new Date(change.previousStartsAt),
    new Date(change.previousEndsAt),
    timeZone,
    false,
  );
  const runs = $localize`:@@eventPage.changed.runs:It now runs ${now}:time: on ${day}:day: (it was ${before}:before:).`;
  const parts = [change.note, runs];
  if (registered) parts.push($localize`:@@eventPage.changed.registered:You're still registered.`);
  return {
    tone: 'warning',
    heading: $localize`:@@eventPage.changed.title:The time of this event has changed`,
    body: parts.filter((part) => part).join(' '),
    link: null,
  };
}
