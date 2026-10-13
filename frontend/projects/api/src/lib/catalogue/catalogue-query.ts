import { ContentType } from '../content/content-type';
import { CatalogueDuration } from './catalogue-duration';
import { CatalogueLevel } from './catalogue-level';
import { CatalogueSort } from './catalogue-sort';

/** What to browse: the selected filter values, the sort and the page (from 1). */
export interface CatalogueQuery {
  readonly types: readonly ContentType[];
  readonly topics: readonly string[];
  readonly levels: readonly CatalogueLevel[];
  readonly contributors: readonly string[];
  readonly durations: readonly CatalogueDuration[];
  readonly sort: CatalogueSort;
  readonly page: number;
}
