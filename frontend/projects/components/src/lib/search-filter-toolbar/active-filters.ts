import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from '../button/button';

/** The row of removable pills for the filters that are on, with an optional Clear all. */
@Component({
  selector: 'ul[llActiveFilters]',
  imports: [Button],
  templateUrl: './active-filters.html',
  styleUrl: './active-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'active-filters',
    '[attr.aria-label]': 'label()',
  },
})
export class ActiveFilters {
  /** The list's name: "Active filters". */
  readonly label = input.required<string>();
  /** The Clear all button's text; without one the list has no such button. */
  readonly clearLabel = input<string | null>(null);

  readonly cleared = output<void>();
}
