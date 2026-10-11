/** Picks the message for a count by the locale's plural rules (L2-147: never concatenation). */
export function plural(
  locale: string,
  count: number,
  messages: { one: string; other: string },
): string {
  return new Intl.PluralRules(locale).select(count) === 'one' ? messages.one : messages.other;
}
