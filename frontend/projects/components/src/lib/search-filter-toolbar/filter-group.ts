import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** One filter of the panel: its legend and a list of options. */
@Component({
  selector: 'fieldset[llFilterGroup]',
  templateUrl: './filter-group.html',
  styleUrl: './filter-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'filter' },
})
export class FilterGroup {
  readonly label = input.required<string>();
  /** The native `name` of each option's checkbox. */
  readonly name = input<string | null>(null);
}
