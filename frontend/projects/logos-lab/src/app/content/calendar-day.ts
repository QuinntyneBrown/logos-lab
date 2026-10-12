/** A day with its weekday and year, such as "Tue, Oct 20, 2026", in the locale's own format. */
export function calendarDay(locale: string, date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
