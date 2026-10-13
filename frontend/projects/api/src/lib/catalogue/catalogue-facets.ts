import { ContributorFacet } from './contributor-facet';
import { TopicFacet } from './topic-facet';
import { TypeFacet } from './type-facet';

/** The full option lists of the filters; the active filters never narrow them. */
export interface CatalogueFacets {
  readonly types: readonly TypeFacet[];
  readonly topics: readonly TopicFacet[];
  /** Starts with Logos Lab. */
  readonly contributors: readonly ContributorFacet[];
}
