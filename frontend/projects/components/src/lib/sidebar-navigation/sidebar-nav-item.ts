import { Params } from '@angular/router';

/** A row in a sidebar navigation: a link when it has a path, otherwise an action. */
export interface SidebarNavItem {
  readonly id: string;
  readonly label: string;
  readonly path?: string;
  readonly queryParams?: Params;
  readonly exact?: boolean;
  readonly count?: number;
  readonly countLabel?: string;
}
