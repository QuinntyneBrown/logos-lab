import { SearchResultType } from '@logos-lab/api';
import { plural } from './plural';

/** The order the result types appear in, after "All": tabs and groups that lack a better order. */
export const SEARCH_TYPE_ORDER: readonly SearchResultType[] = [
  'course',
  'module',
  'video',
  'article',
  'collection',
  'event',
  'expert',
];

/** The type a `type` query parameter names, or null when it is absent or unknown. */
export function parseSearchType(value: string | null): SearchResultType | null {
  return SEARCH_TYPE_ORDER.find((type) => type === value) ?? null;
}

/** The plural name of a result type: a tab label or a group heading. */
export function searchTypeLabel(type: SearchResultType): string {
  switch (type) {
    case 'course':
      return $localize`:@@search.type.course:Courses`;
    case 'module':
      return $localize`:@@search.type.module:Modules`;
    case 'video':
      return $localize`:@@search.type.video:Videos`;
    case 'article':
      return $localize`:@@search.type.article:Articles`;
    case 'collection':
      return $localize`:@@search.type.collection:Collections`;
    case 'event':
      return $localize`:@@search.type.event:Events`;
    case 'expert':
      return $localize`:@@search.type.expert:Experts`;
  }
}

/** A count with its noun, "3 videos" or "1 course", by the locale's plural rules (L2-147). */
export function searchCountLabel(locale: string, type: SearchResultType, count: number): string {
  const n = new Intl.NumberFormat(locale).format(count);
  switch (type) {
    case 'course':
      return plural(locale, count, {
        one: $localize`:@@search.count.course.one:${n}:count: course`,
        other: $localize`:@@search.count.course.other:${n}:count: courses`,
      });
    case 'module':
      return plural(locale, count, {
        one: $localize`:@@search.count.module.one:${n}:count: module`,
        other: $localize`:@@search.count.module.other:${n}:count: modules`,
      });
    case 'video':
      return plural(locale, count, {
        one: $localize`:@@search.count.video.one:${n}:count: video`,
        other: $localize`:@@search.count.video.other:${n}:count: videos`,
      });
    case 'article':
      return plural(locale, count, {
        one: $localize`:@@search.count.article.one:${n}:count: article`,
        other: $localize`:@@search.count.article.other:${n}:count: articles`,
      });
    case 'collection':
      return plural(locale, count, {
        one: $localize`:@@search.count.collection.one:${n}:count: collection`,
        other: $localize`:@@search.count.collection.other:${n}:count: collections`,
      });
    case 'event':
      return plural(locale, count, {
        one: $localize`:@@search.count.event.one:${n}:count: event`,
        other: $localize`:@@search.count.event.other:${n}:count: events`,
      });
    case 'expert':
      return plural(locale, count, {
        one: $localize`:@@search.count.expert.one:${n}:count: expert`,
        other: $localize`:@@search.count.expert.other:${n}:count: experts`,
      });
  }
}
