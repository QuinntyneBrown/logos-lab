import { SidebarNavItem } from './sidebar-nav-item';

/** A labelled group of rows in a sidebar navigation. */
export interface SidebarNavGroup {
  readonly label?: string;
  readonly items: readonly SidebarNavItem[];
}
