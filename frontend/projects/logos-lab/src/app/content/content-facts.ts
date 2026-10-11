import { ContentSummary } from '@logos-lab/api';
import { plural } from './plural';

/**
 * The short facts a content card shows for an item, formatted for the locale (L2-148). The facts
 * per type are set in the home-page detailed design.
 */
export function contentFacts(item: ContentSummary, locale: string): string[] {
  const number = new Intl.NumberFormat(locale);
  switch (item.type) {
    case 'course':
      return [
        ...(item.lessonCount === undefined ? [] : [lessons(item.lessonCount, locale, number)]),
        ...(item.durationMinutes === undefined ? [] : [hoursAndMinutes(item.durationMinutes)]),
      ];
    case 'module':
      return [
        ...(item.durationMinutes === undefined ? [] : [minutes(item.durationMinutes)]),
        ...(item.scored ? [$localize`:@@content.fact.scored:Scored`] : []),
      ];
    case 'video':
      if (item.freePreview) return [$localize`:@@content.fact.freePreview:Free preview`];
      return item.topic ? [item.topic.name] : [];
    case 'article':
      return item.readingMinutes === undefined
        ? []
        : [
            $localize`:@@content.fact.readingTime:${number.format(item.readingMinutes)}:minutes: min read`,
          ];
    case 'collection':
      return item.itemCount === undefined
        ? []
        : [
            plural(locale, item.itemCount, {
              one: $localize`:@@content.fact.items.one:${number.format(item.itemCount)}:count: item`,
              other: $localize`:@@content.fact.items.other:${number.format(item.itemCount)}:count: items`,
            }),
          ];
    case 'event':
      return [
        ...(item.startsAt ? [eventStart(item.startsAt, locale)] : []),
        ...(item.attendance ? [attendance(item.attendance)] : []),
      ];
  }
}

/** A video's length as a clock: "24:18", "1:02:05". */
export function videoDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** An event's start in the viewer's time zone, with the zone named: "Tue, Oct 27, 12:00 p.m. EDT". */
export function eventStart(startsAt: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(startsAt));
}

function lessons(count: number, locale: string, number: Intl.NumberFormat): string {
  return plural(locale, count, {
    one: $localize`:@@content.fact.lessons.one:${number.format(count)}:count: lesson`,
    other: $localize`:@@content.fact.lessons.other:${number.format(count)}:count: lessons`,
  });
}

function hoursAndMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (!hours) return minutes(rest);
  if (!rest) return $localize`:@@content.fact.hours:${hours}:hours: h`;
  return $localize`:@@content.fact.hoursMinutes:${hours}:hours: h ${rest}:minutes: min`;
}

function minutes(count: number): string {
  return $localize`:@@content.fact.minutes:${count}:minutes: min`;
}

function attendance(value: NonNullable<ContentSummary['attendance']>): string {
  switch (value) {
    case 'online':
      return $localize`:@@event.attendance.online:Online`;
    case 'in-person':
      return $localize`:@@event.attendance.inPerson:In person`;
    case 'hybrid':
      return $localize`:@@event.attendance.hybrid:Online and in person`;
  }
}
