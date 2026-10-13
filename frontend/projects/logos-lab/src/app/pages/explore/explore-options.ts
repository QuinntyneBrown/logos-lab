import { CatalogueFacets, CatalogueQuery } from '@logos-lab/api';
import {
  CATALOGUE_DURATIONS,
  CATALOGUE_LEVELS,
  catalogueDurationLabel,
  catalogueLevelLabel,
} from '../../content/catalogue-labels';
import { contentTypeLabel } from '../../content/content-labels';
import { ExploreOption } from './explore-option';
import { ExploreOptions } from './explore-options-view';

/** Every option of the filters, with its label and whether the query has it on. */
export function exploreOptions(
  facets: CatalogueFacets | null,
  query: CatalogueQuery,
): ExploreOptions {
  return {
    types: (facets?.types ?? []).map((facet): ExploreOption => ({
      value: facet.value,
      label: contentTypeLabel(facet.value),
      count: facet.count,
      checked: query.types.includes(facet.value),
    })),
    topics: (facets?.topics ?? []).map((facet): ExploreOption => ({
      value: facet.value,
      label: facet.label,
      count: facet.count,
      checked: query.topics.includes(facet.value),
    })),
    levels: CATALOGUE_LEVELS.map((level): ExploreOption => ({
      value: level,
      label: catalogueLevelLabel(level),
      count: null,
      checked: query.levels.includes(level),
    })),
    contributors: (facets?.contributors ?? []).map((facet): ExploreOption => ({
      value: facet.value,
      label: facet.label,
      count: null,
      checked: query.contributors.includes(facet.value),
    })),
    durations: CATALOGUE_DURATIONS.map((duration): ExploreOption => ({
      value: duration,
      label: catalogueDurationLabel(duration),
      count: null,
      checked: query.durations.includes(duration),
    })),
  };
}
