import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/** The filters beside the results: a landmark with its heading and the filter groups. */
@Component({
  selector: 'll-filter-panel',
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanel {
  readonly heading = input.required<string>();

  protected readonly titleId = `ll-filters-title-${nextId++}`;
}
