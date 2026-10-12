/** A time of day with its zone, such as "10:24 a.m. EDT", in the locale's own format. */
export function clockTime(locale: string, date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}
