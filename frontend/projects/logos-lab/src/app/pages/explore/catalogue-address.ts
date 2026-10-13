import { ParamMap, Params } from '@angular/router';
import { CatalogueQuery } from '@logos-lab/api';
import { CONTENT_TYPES } from '../../content/content-types';

/** Reads the address into a query; a value that is not one of the filter's values is dropped. */
export function readCatalogueQuery(params: ParamMap): CatalogueQuery {
  return {
    types: CONTENT_TYPES.filter((type) => params.getAll('type').includes(type)),
    topics: [],
    levels: [],
    contributors: [],
    durations: [],
    sort: 'newest',
    page: 1,
  };
}

/** The address of a query: only what differs from the defaults, in a fixed order. */
export function catalogueAddress(query: CatalogueQuery): Params {
  const params: Params = {};
  if (query.types.length) params['type'] = query.types;
  return params;
}
