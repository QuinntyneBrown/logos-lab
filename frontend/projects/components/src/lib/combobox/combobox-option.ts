import { IconName } from '../icon/icon-name';
import { ComboboxTextSegment } from './combobox-text-segment';

/** One suggestion in a combobox list. */
export interface ComboboxOption {
  readonly id: string;
  readonly segments: readonly ComboboxTextSegment[];
  readonly meta: string;
  readonly icon: IconName;
  readonly path: string;
}
