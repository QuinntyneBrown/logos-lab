/** "Tuesday, October 27, 2026 at 12:00 – 1:00 PM ET", in one zone or the viewer's own. */
export function eventWhen(
  locale: string,
  startsAt: string,
  endsAt: string,
  timeZone?: string,
): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'shortGeneric',
    timeZone,
  }).formatRange(new Date(startsAt), new Date(endsAt));
}

/** "12:05 PM", in one zone or the viewer's own. */
export function eventTime(locale: string, startsAt: string, timeZone?: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(new Date(startsAt));
}

/** The day of the month and the short month of the start, for the date block. */
export function eventDay(
  locale: string,
  startsAt: string,
  timeZone?: string,
): { day: string; month: string } {
  const start = new Date(startsAt);
  return {
    day: new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone }).format(start),
    month: new Intl.DateTimeFormat(locale, { month: 'short', timeZone }).format(start),
  };
}
