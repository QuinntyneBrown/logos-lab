import { ComboboxGroup, ComboboxStatus } from '@logos-lab/components';

/** What the site search's suggestion list shows. */
export interface SuggestionState {
  readonly open: boolean;
  readonly query: string;
  readonly groups: readonly ComboboxGroup[];
  readonly status: ComboboxStatus | null;
  readonly statusText: string;
  readonly footText: string | null;
  readonly announcement: string;
}
