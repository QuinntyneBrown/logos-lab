import { EventPageModel } from '@logos-lab/api';
import { plural } from '../../content/plural';
import { EventPanelView } from './event-panel-view';

/** The panel for a visitor or a member who is not registered. */
export function toEventPanel(
  event: EventPageModel,
  visitor: boolean,
  locale: string,
): EventPanelView {
  const number = new Intl.NumberFormat(locale);
  const full = event.capacity !== null && event.registeredCount >= event.capacity;
  const left = event.capacity === null ? null : event.capacity - event.registeredCount;
  const taken = number.format(event.registeredCount);
  const places =
    event.capacity === null
      ? null
      : {
          taken: event.registeredCount,
          capacity: event.capacity,
          label: $localize`:@@eventPage.places.label:Places taken`,
          text:
            left !== null && left > 0
              ? plural(locale, left, {
                  one: $localize`:@@eventPage.places.one:${taken}:registered: registered · ${number.format(left)}:left: place left`,
                  other: $localize`:@@eventPage.places.other:${taken}:registered: registered · ${number.format(left)}:left: places left`,
                })
              : $localize`:@@eventPage.places.none:${taken}:registered: registered · no places left`,
        };
  if (visitor) {
    return {
      heading: $localize`:@@eventPage.signIn.title:Sign in to register`,
      text: $localize`:@@eventPage.signIn.text:Registration is free with a Logos Lab account. After you sign in, we bring you back here to finish.`,
      note: null,
      places,
      status: null,
      help: null,
      signIn: true,
    };
  }
  if (full) {
    const waiting = number.format(event.waitlistCount);
    return {
      heading: $localize`:@@eventPage.full.title:This event is full`,
      text: null,
      note: $localize`:@@eventPage.full.note:If someone cancels more than 2 hours before the start, the first person waiting gets the place automatically and an email. Closer to the start, they get 30 minutes to accept.`,
      places,
      status:
        event.waitlistCount === 0
          ? $localize`:@@eventPage.waitlist.none:No one is on the waitlist yet`
          : plural(locale, event.waitlistCount, {
              one: $localize`:@@eventPage.waitlist.one:${waiting}:count: person on the waitlist`,
              other: $localize`:@@eventPage.waitlist.other:${waiting}:count: people on the waitlist`,
            }),
      help: null,
      signIn: false,
    };
  }
  return {
    heading: $localize`:@@eventPage.register.title:Register for this event`,
    text: $localize`:@@eventPage.register.text:Free for members. We'll email you a calendar file and remind you a day and an hour before.`,
    note: null,
    places,
    status: null,
    help:
      event.attendance === 'in-person'
        ? null
        : $localize`:@@eventPage.register.help:The join link is shown only to registered members, from 15 minutes before the start.`,
    signIn: false,
  };
}
