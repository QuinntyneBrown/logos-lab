import { ComboboxOption } from './combobox-option';

/** A labelled group of combobox options. */
export interface ComboboxGroup {
  readonly label: string;
  readonly options: readonly ComboboxOption[];
}
