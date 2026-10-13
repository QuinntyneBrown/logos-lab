import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from '../button/button';
import { FilterPanelPresentation } from './filter-panel-presentation';

let nextId = 0;

/** The filters: a landmark beside the results, or the body of the filters dialog. */
@Component({
  selector: 'll-filter-panel',
  imports: [NgTemplateOutlet, Button],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.filter-panel--dialog]': "presentation() === 'dialog'" },
})
export class FilterPanel {
  readonly presentation = input<FilterPanelPresentation>('inline');
  /** The inline panel's heading; the dialog's title names the dialog presentation. */
  readonly heading = input<string | null>(null);
  /** True while any filter is on: the panel then offers Clear all. */
  readonly canClear = input(false, { transform: booleanAttribute });
  readonly clearLabel = input.required<string>();
  /** The dialog presentation's summary line: "1 filter on. The count updates as you go." */
  readonly summary = input<string | null>(null);
  readonly summaryId = input<string | null>(null);

  readonly cleared = output<void>();

  protected readonly titleId = `ll-filters-title-${nextId++}`;
}
