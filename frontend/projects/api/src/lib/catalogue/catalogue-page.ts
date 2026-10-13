import { ContentSummary } from '../content/content-summary';
import { CatalogueFacets } from './catalogue-facets';

/** GET /api/v1/catalogue: one page of the catalogue (detailed design discovery/browse-catalogue). */
export interface CataloguePage {
  /** At most 24, in the requested order. */
  readonly items: readonly ContentSummary[];
  /** All items that match the filters. */
  readonly total: number;
  readonly page: number;
  readonly pageCount: number;
  readonly facets: CatalogueFacets;
  /** Keyword search is limited; browsing is complete. */
  readonly searchDegraded: boolean;
}
