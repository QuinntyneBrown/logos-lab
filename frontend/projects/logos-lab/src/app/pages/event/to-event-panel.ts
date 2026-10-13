import { EventPageModel } from '@logos-lab/api';
import { eventClock, eventDate } from '../../content/event-moment';
import { plural } from '../../content/plural';
import { EventPanelView } from './event-panel-view';
import { EventViewer } from './event-viewer';

const MINUTE = 60_000;
/** The join link shows this long before the start. */
const JOIN_WINDOW = 15 * MINUTE;

/** The panel for this viewer and this event, as it stands at `now`. */
export function toEventPanel(
  event: EventPageModel,
  viewer: EventViewer,
  waitlistPosition: number | null,
  now: Date,
  locale: string,
  timeZone: string | undefined,
): EventPanelView {
  const number = new Intl.NumberFormat(locale);
  const full = event.capacity !== null && event.registeredCount >= event.capacity;
  const left = event.capacity === null ? null : event.capacity - event.registeredCount;
  const taken = number.format(event.registeredCount);
  const start = new Date(event.startsAt);
  const end = new Date(event.endsAt);
  const toGo = start.getTime() - now.getTime();
  const live = toGo <= 0 && now < end;
  const joinOpen = toGo <= JOIN_WINDOW && now < end;

  const placesText = (): string => {
    if (viewer === 'registered' && (joinOpen || left === null || left <= 0)) {
      return $localize`:@@eventPage.places.including:${taken}:registered: registered, including you`;
    }
    if (viewer === 'registered') {
      return plural(locale, left ?? 0, {
        one: $localize`:@@eventPage.places.including.one:${taken}:registered: registered, including you · ${number.format(left ?? 0)}:left: place left`,
        other: $localize`:@@eventPage.places.including.other:${taken}:registered: registered, including you · ${number.format(left ?? 0)}:left: places left`,
      });
    }
    if (left !== null && left > 0) {
      return plural(locale, left, {
        one: $localize`:@@eventPage.places.one:${taken}:registered: registered · ${number.format(left)}:left: place left`,
        other: $localize`:@@eventPage.places.other:${taken}:registered: registered · ${number.format(left)}:left: places left`,
      });
    }
    return $localize`:@@eventPage.places.none:${taken}:registered: registered · no places left`;
  };
  const places =
    event.capacity === null
      ? null
      : {
          taken: event.registeredCount,
          capacity: event.capacity,
          label: $localize`:@@eventPage.places.label:Places taken`,
          text: placesText(),
        };
  const base = {
    going: false,
    text: null,
    note: null,
    places,
    status: null,
    badge: null,
    help: null,
    signIn: false,
  };

  if (viewer === 'visitor') {
    return {
      ...base,
      heading: $localize`:@@eventPage.signIn.title:Sign in to register`,
      text: $localize`:@@eventPage.signIn.text:Registration is free with a Logos Lab account. After you sign in, we bring you back here to finish.`,
      signIn: true,
    };
  }
  if (viewer === 'registered') {
    const online = event.attendance !== 'in-person';
    if (live) {
      const from = eventClock(locale, start, timeZone);
      const until = eventClock(locale, end, timeZone);
      return {
        ...base,
        going: true,
        heading: $localize`:@@eventPage.live.title:Happening now`,
        badge: $localize`:@@eventPage.live.badge:Happening now`,
        status: { tone: 'success', text: $localize`:@@eventPage.registered.status:Registered` },
        help: online
          ? $localize`:@@eventPage.live.help:Started at ${from}:start:. Ends at ${until}:end:.`
          : null,
      };
    }
    if (joinOpen) {
      const minutes = Math.max(1, Math.ceil(toGo / MINUTE));
      const soon = new Intl.RelativeTimeFormat(locale, { numeric: 'always' }).format(
        minutes,
        'minute',
      );
      return {
        ...base,
        going: true,
        heading: $localize`:@@eventPage.registered.title:You're registered`,
        status: {
          tone: 'success',
          text: $localize`:@@eventPage.registered.soon:Registered · starts ${soon}:soon:`,
        },
      };
    }
    const opens = new Date(start.getTime() - JOIN_WINDOW);
    const time = eventClock(locale, opens, timeZone);
    const day = eventDate(locale, opens, timeZone);
    return {
      ...base,
      going: true,
      heading: $localize`:@@eventPage.registered.title:You're registered`,
      status: { tone: 'success', text: $localize`:@@eventPage.registered.status:Registered` },
      help: online
        ? $localize`:@@eventPage.registered.help:The join link appears here from ${time}:time: on ${day}:day:, 15 minutes before the start.`
        : null,
    };
  }
  if (viewer === 'waitlisted') {
    const position = number.format(waitlistPosition ?? event.waitlistCount);
    const total = number.format(event.waitlistCount);
    return {
      ...base,
      heading: $localize`:@@eventPage.waitlisted.title:You're on the waitlist`,
      status: {
        tone: 'warning',
        text: $localize`:@@eventPage.waitlisted.position:You're number ${position}:position: of ${total}:total:`,
      },
      note: $localize`:@@eventPage.waitlisted.note:If a place opens more than 2 hours before the start, we register you automatically and email you. Closer to the start, you'll have 30 minutes to accept.`,
    };
  }
  if (full) {
    const waiting = number.format(event.waitlistCount);
    return {
      ...base,
      heading: $localize`:@@eventPage.full.title:This event is full`,
      note: $localize`:@@eventPage.full.note:If someone cancels more than 2 hours before the start, the first person waiting gets the place automatically and an email. Closer to the start, they get 30 minutes to accept.`,
      status: {
        tone: 'warning',
        text:
          event.waitlistCount === 0
            ? $localize`:@@eventPage.waitlist.none:No one is on the waitlist yet`
            : plural(locale, event.waitlistCount, {
                one: $localize`:@@eventPage.waitlist.one:${waiting}:count: person on the waitlist`,
                other: $localize`:@@eventPage.waitlist.other:${waiting}:count: people on the waitlist`,
              }),
      },
    };
  }
  return {
    ...base,
    heading: $localize`:@@eventPage.register.title:Register for this event`,
    text: $localize`:@@eventPage.register.text:Free for members. We'll email you a calendar file and remind you a day and an hour before.`,
    help:
      event.attendance === 'in-person'
        ? null
        : $localize`:@@eventPage.register.help:The join link is shown only to registered members, from 15 minutes before the start.`,
  };
}
