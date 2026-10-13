/** "11:45 AM ET" in one zone or the viewer's own. */
export function eventClock(locale: string, at: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'shortGeneric',
    timeZone,
  }).format(at);
}

/** "11:45 – 12:45 PM ET", or without the zone, in one zone or the viewer's own. */
export function eventClockRange(
  locale: string,
  from: Date,
  to: Date,
  timeZone: string | undefined,
  zone: boolean,
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: zone ? 'shortGeneric' : undefined,
    timeZone,
  }).formatRange(from, to);
}

/** "Tue, Oct 27, 2026" in one zone or the viewer's own. */
export function eventDateWithYear(locale: string, at: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(at);
}

/** "Tue, Oct 27" in one zone or the viewer's own. */
export function eventDate(locale: string, at: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(at);
}
