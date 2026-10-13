import { ParamMap, Params } from '@angular/router';
import { CatalogueQuery } from '@logos-lab/api';
import { CATALOGUE_DURATIONS, CATALOGUE_LEVELS } from '../../content/catalogue-labels';
import { CONTENT_TYPES } from '../../content/content-types';

/** A topic or expert slug: lower-case words joined by hyphens. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Reads the address into a query; a value that is not one of the filter's values is dropped. */
export function readCatalogueQuery(params: ParamMap): CatalogueQuery {
  const slugs = (name: string) => [...new Set(params.getAll(name).filter((v) => SLUG.test(v)))];
  return {
    types: CONTENT_TYPES.filter((type) => params.getAll('type').includes(type)),
    topics: slugs('topic'),
    levels: CATALOGUE_LEVELS.filter((level) => params.getAll('level').includes(level)),
    contributors: slugs('contributor'),
    durations: CATALOGUE_DURATIONS.filter((value) => params.getAll('duration').includes(value)),
    sort: params.get('sort') === 'popular' ? 'popular' : 'newest',
    page: 1,
  };
}

/** The address of a query: only what differs from the defaults, in a fixed order. */
export function catalogueAddress(query: CatalogueQuery): Params {
  const params: Params = {};
  const canonical = <T extends string>(selected: readonly T[], order: readonly T[]) =>
    order.filter((value) => selected.includes(value));
  if (query.types.length) params['type'] = canonical(query.types, CONTENT_TYPES);
  if (query.topics.length) params['topic'] = query.topics;
  if (query.levels.length) params['level'] = canonical(query.levels, CATALOGUE_LEVELS);
  if (query.contributors.length) params['contributor'] = query.contributors;
  if (query.durations.length) params['duration'] = canonical(query.durations, CATALOGUE_DURATIONS);
  if (query.sort !== 'newest') params['sort'] = query.sort;
  return params;
}
