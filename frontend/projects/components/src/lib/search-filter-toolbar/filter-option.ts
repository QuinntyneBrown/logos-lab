import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
  output,
} from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import { FilterGroup } from './filter-group';

/** One checkbox option of a filter group, with an optional count of the items behind it. */
@Component({
  selector: 'li[llFilterOption]',
  imports: [Checkbox],
  templateUrl: './filter-option.html',
  styleUrl: './filter-option.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterOption {
  readonly label = input.required<string>();
  readonly count = input<number | null>(null);
  /** The page owns the state: it sets this from the address. */
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly changed = output<boolean>();

  protected readonly name = inject(FilterGroup, { optional: true })?.name() ?? null;
  private readonly locale = inject(LOCALE_ID);
  protected readonly countText = computed(() => {
    const count = this.count();
    return count === null ? null : new Intl.NumberFormat(this.locale).format(count);
  });
}
