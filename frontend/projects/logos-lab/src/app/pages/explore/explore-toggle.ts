import { FilterKey } from './filter-key';

/** A filter option the member turned on or off. */
export interface ExploreToggle {
  readonly key: FilterKey;
  readonly value: string;
  readonly checked: boolean;
}
