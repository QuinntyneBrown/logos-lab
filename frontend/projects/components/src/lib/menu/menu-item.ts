import { Params } from '@angular/router';
import { IconName } from '../icon/icon-name';

/** A menu row: a link with a path, a radio choice with `checked`, otherwise an action. */
export interface MenuItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: IconName;
  readonly path?: string;
  readonly queryParams?: Params;
  readonly checked?: boolean;
  readonly shortcut?: string;
  readonly shortcutLabel?: string;
  readonly danger?: boolean;
}
