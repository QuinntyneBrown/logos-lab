import {
  SearchExpertHit,
  SearchResultGroup,
  SearchResults,
  SearchResultType,
} from '@logos-lab/api';
import { toContentCard } from '../../content/content-card-view';
import { plural } from '../../content/plural';
import {
  SEARCH_TYPE_ORDER,
  searchCountLabel,
  searchTypeLabel,
} from '../../content/search-type-labels';
import { SearchExpertView } from './search-expert-view';
import { SearchGroupView } from './search-group-view';
import { SearchTab } from './search-tab';

/** "All", then one tab for each type with matches, in the fixed type order. */
export function toSearchTabs(
  results: SearchResults,
  query: string,
  selected: SearchResultType | null,
): SearchTab[] {
  const counts = SEARCH_TYPE_ORDER.flatMap((type) =>
    results.counts.filter((entry) => entry.type === type && entry.count > 0),
  );
  return [
    {
      type: null,
      label: $localize`:@@search.type.all:All`,
      count: results.total,
      current: selected === null,
      queryParams: { q: query },
    },
    ...counts.map((entry) => ({
      type: entry.type,
      label: searchTypeLabel(entry.type),
      count: entry.count,
      current: entry.type === selected,
      queryParams: { q: query, type: entry.type },
    })),
  ];
}

/** The groups in the order the API sent them. */
export function toSearchGroups(
  results: SearchResults,
  query: string,
  locale: string,
): SearchGroupView[] {
  return results.groups.map((group) => toGroupView(group, query, locale));
}

function toGroupView(group: SearchResultGroup, query: string, locale: string): SearchGroupView {
  const shown = group.type === 'expert' ? group.experts.length : group.hits.length;
  const all = searchCountLabel(locale, group.type, group.count);
  return {
    type: group.type,
    headingId: `search-group-${group.type}`,
    title: searchTypeLabel(group.type),
    count: group.count,
    moreLabel: group.count > shown ? $localize`:@@search.group.more:All ${all}:count:` : null,
    moreQueryParams: { q: query, type: group.type },
    hits:
      group.type === 'expert'
        ? []
        : group.hits.map((hit) => ({
            card: toContentCard(hit.item, locale),
            snippet: hit.snippet,
          })),
    experts: group.type === 'expert' ? group.experts.map((e) => toExpertView(e, locale)) : [],
  };
}

function toExpertView(expert: SearchExpertHit, locale: string): SearchExpertView {
  const items = new Intl.NumberFormat(locale).format(expert.itemCount);
  return {
    name: expert.name,
    path: `/experts/${expert.slug}`,
    photoUrl: expert.photoUrl ?? null,
    headline: expert.headline,
    itemsLabel: plural(locale, expert.itemCount, {
      one: $localize`:@@search.expert.items.one:${items}:count: item`,
      other: $localize`:@@search.expert.items.other:${items}:count: items`,
    }),
  };
}
