/**
 * A rough length for a set of items: "45 minutes", "10 hours". Under an hour it counts minutes, and
 * from an hour up it rounds to the nearest whole hour. The caller adds "about" or "About".
 */
export function approximateLength(totalMinutes: number): string {
  if (totalMinutes < 60) {
    const minutes = Math.max(1, Math.round(totalMinutes));
    return minutes === 1
      ? $localize`:@@length.minute:1 minute`
      : $localize`:@@length.minutes:${minutes}:count: minutes`;
  }
  const hours = Math.round(totalMinutes / 60);
  return hours === 1
    ? $localize`:@@length.hour:1 hour`
    : $localize`:@@length.hours:${hours}:count: hours`;
}
