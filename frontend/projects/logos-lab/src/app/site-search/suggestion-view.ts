import { SearchSuggestion, SearchSuggestionKind } from '@logos-lab/api';
import { ComboboxGroup, IconName } from '@logos-lab/components';
import { contentTypeLabel } from '../content/content-labels';
import { contentPath } from '../content/content-paths';
import { plural } from '../content/plural';

const ICONS: Record<SearchSuggestionKind, IconName> = {
  course: 'course',
  module: 'module',
  video: 'video',
  article: 'article',
  collection: 'collection',
  event: 'calendar',
  expert: 'people',
  topic: 'collection',
};

/** Groups suggestions by kind, in the order the API ranks them. */
export function toSuggestionGroups(
  suggestions: readonly SearchSuggestion[],
  locale: string,
): readonly ComboboxGroup[] {
  const groups = new Map<SearchSuggestionKind, ComboboxGroup>();
  for (const suggestion of suggestions) {
    const group = groups.get(suggestion.kind) ?? {
      label: groupLabel(suggestion.kind),
      options: [],
    };
    groups.set(suggestion.kind, {
      ...group,
      options: [
        ...group.options,
        {
          id: `${suggestion.kind}:${suggestion.slug}`,
          segments: suggestion.label,
          meta: meta(suggestion, locale),
          icon: ICONS[suggestion.kind],
          path: path(suggestion),
        },
      ],
    });
  }
  return [...groups.values()];
}

function path(suggestion: SearchSuggestion): string {
  switch (suggestion.kind) {
    case 'expert':
      return `/experts/${suggestion.slug}`;
    case 'topic':
      return `/topics/${suggestion.slug}`;
    default:
      return contentPath(suggestion.kind, suggestion.slug);
  }
}

function meta(suggestion: SearchSuggestion, locale: string): string {
  switch (suggestion.kind) {
    case 'expert':
      return $localize`:@@search.suggestion.expert:Expert`;
    case 'topic': {
      const count = suggestion.itemCount ?? 0;
      const formatted = new Intl.NumberFormat(locale).format(count);
      return plural(locale, count, {
        one: $localize`:@@content.fact.items.one:${formatted}:count: item`,
        other: $localize`:@@content.fact.items.other:${formatted}:count: items`,
      });
    }
    default:
      return contentTypeLabel(suggestion.kind);
  }
}

function groupLabel(kind: SearchSuggestionKind): string {
  switch (kind) {
    case 'course':
      return $localize`:@@search.group.courses:Courses`;
    case 'module':
      return $localize`:@@search.group.modules:Modules`;
    case 'video':
      return $localize`:@@search.group.videos:Videos`;
    case 'article':
      return $localize`:@@search.group.articles:Articles`;
    case 'collection':
      return $localize`:@@search.group.collections:Collections`;
    case 'event':
      return $localize`:@@search.group.events:Events`;
    case 'expert':
      return $localize`:@@search.group.experts:Experts`;
    case 'topic':
      return $localize`:@@search.group.topics:Topics`;
  }
}
