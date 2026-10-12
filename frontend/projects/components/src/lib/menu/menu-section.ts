import { MenuItem } from './menu-item';

/** A run of menu items, optionally labelled; sections are divided by hairlines. */
export interface MenuSection {
  readonly label?: string;
  readonly items: readonly MenuItem[];
}
