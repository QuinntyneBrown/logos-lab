import { Params } from '@angular/router';

/** One destination in the top bar's navigation. */
export interface TopBarLink {
  readonly label: string;
  readonly path: string;
  readonly queryParams?: Params;
  /** Match the path exactly rather than as a prefix when marking the current page. */
  readonly exact?: boolean;
}
