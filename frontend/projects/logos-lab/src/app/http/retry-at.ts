/** When a `429` lifts: `Retry-After` is delay-seconds or an HTTP date; without one, `fallbackMs`. */
export function retryAt(header: string | null, now: Date, fallbackMs: number): Date {
  const seconds = Number(header);
  if (header && Number.isFinite(seconds)) return new Date(now.getTime() + seconds * 1000);
  const date = header ? new Date(header) : null;
  if (date && !Number.isNaN(date.getTime())) return date;
  return new Date(now.getTime() + fallbackMs);
}
