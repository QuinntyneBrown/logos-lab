import { ContentType } from '@logos-lab/api';
import { plural } from './plural';

/** What the count line counts: "items", or the one selected type, by the locale's plural rules. */
export function catalogueNoun(locale: string, type: ContentType | null, count: number): string {
  switch (type) {
    case 'course':
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.course.one:course`,
        other: $localize`:@@catalogue.noun.course.other:courses`,
      });
    case 'module':
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.module.one:module`,
        other: $localize`:@@catalogue.noun.module.other:modules`,
      });
    case 'video':
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.video.one:video`,
        other: $localize`:@@catalogue.noun.video.other:videos`,
      });
    case 'article':
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.article.one:article`,
        other: $localize`:@@catalogue.noun.article.other:articles`,
      });
    case 'collection':
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.collection.one:collection`,
        other: $localize`:@@catalogue.noun.collection.other:collections`,
      });
    case 'event':
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.event.one:event`,
        other: $localize`:@@catalogue.noun.event.other:events`,
      });
    case null:
      return plural(locale, count, {
        one: $localize`:@@catalogue.noun.item.one:item`,
        other: $localize`:@@catalogue.noun.item.other:items`,
      });
  }
}
