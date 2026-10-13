/** A calendar day given as `YYYY-MM-DD`, such as "Sep 29, 2026", in the locale's own format. */
export function publicationDay(locale: string, day: string): string {
  // A day has no time zone: read and print it as UTC so it never moves to the day before or after.
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${day}T00:00:00Z`));
}
