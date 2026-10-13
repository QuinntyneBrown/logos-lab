import { ExploreOption } from './explore-option';

/** The options of each filter group. */
export interface ExploreOptions {
  readonly types: readonly ExploreOption[];
  readonly topics: readonly ExploreOption[];
  readonly levels: readonly ExploreOption[];
  readonly contributors: readonly ExploreOption[];
  readonly durations: readonly ExploreOption[];
}
