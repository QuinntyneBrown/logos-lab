/** "11:45 AM ET" in one zone or the viewer's own. */
export function eventClock(locale: string, at: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'shortGeneric',
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
