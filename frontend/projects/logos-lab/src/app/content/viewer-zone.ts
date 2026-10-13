/** A time zone named in full and in short: "Eastern Time" and "ET"; the viewer's own by default. */
export function viewerZone(
  locale: string,
  at: Date,
  timeZone?: string,
): { long: string; short: string } {
  const name = (timeZoneName: 'longGeneric' | 'shortGeneric') =>
    new Intl.DateTimeFormat(locale, { timeZoneName, timeZone })
      .formatToParts(at)
      .find((part) => part.type === 'timeZoneName')?.value ?? '';
  return { long: name('longGeneric'), short: name('shortGeneric') };
}
