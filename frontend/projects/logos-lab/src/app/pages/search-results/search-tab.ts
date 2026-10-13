import { SearchResultType } from '@logos-lab/api';

/** One result-type tab: "All" has no type. */
export interface SearchTab {
  readonly type: SearchResultType | null;
  readonly label: string;
  readonly count: number;
  readonly current: boolean;
  readonly queryParams: { readonly q: string; readonly type?: SearchResultType };
}
