import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
} from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

/** The toolbar button that opens the filters below LG, with how many filters are on. */
@Component({
  selector: 'll-filters-button',
  imports: [Button, Icon],
  templateUrl: './filters-button.html',
  styleUrl: './filters-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersButton {
  /** The number of filters on; a positive number follows the label: "Filters · 3". */
  readonly activeCount = input(0);

  private readonly locale = inject(LOCALE_ID);
  protected readonly countText = computed(() =>
    this.activeCount() > 0 ? new Intl.NumberFormat(this.locale).format(this.activeCount()) : null,
  );
}
