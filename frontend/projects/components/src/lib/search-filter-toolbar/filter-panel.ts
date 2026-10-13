import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from '../button/button';

let nextId = 0;

/** The filters beside the results: a landmark with its heading and the filter groups. */
@Component({
  selector: 'll-filter-panel',
  imports: [Button],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanel {
  readonly heading = input.required<string>();
  /** True while any filter is on: the head then offers Clear all. */
  readonly canClear = input(false, { transform: booleanAttribute });
  readonly clearLabel = input.required<string>();

  readonly cleared = output<void>();

  protected readonly titleId = `ll-filters-title-${nextId++}`;
}
