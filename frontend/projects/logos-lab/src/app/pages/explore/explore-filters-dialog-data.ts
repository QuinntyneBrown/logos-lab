import { CatalogueFacets, CatalogueQuery } from '@logos-lab/api';

/** What the filters dialog starts from: the address's query, the option lists and the count. */
export interface ExploreFiltersDialogData {
  readonly query: CatalogueQuery;
  readonly facets: CatalogueFacets;
  readonly total: number;
}
