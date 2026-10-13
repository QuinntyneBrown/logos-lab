/** The viewer's time zone named in full and in short: "Eastern Time" and "ET". */
export function viewerZone(locale: string, at: Date): { long: string; short: string } {
  const name = (timeZoneName: 'longGeneric' | 'shortGeneric') =>
    new Intl.DateTimeFormat(locale, { timeZoneName })
      .formatToParts(at)
      .find((part) => part.type === 'timeZoneName')?.value ?? '';
  return { long: name('longGeneric'), short: name('shortGeneric') };
}
