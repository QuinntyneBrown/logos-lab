/** "Two", "Three", "Four" rather than digits in summary titles, as the mocks write them. */
export function countWords(locale: string, count: number): string {
  switch (count) {
    case 2:
      return $localize`:@@number.two:Two`;
    case 3:
      return $localize`:@@number.three:Three`;
    case 4:
      return $localize`:@@number.four:Four`;
    default:
      return new Intl.NumberFormat(locale).format(count);
  }
}
