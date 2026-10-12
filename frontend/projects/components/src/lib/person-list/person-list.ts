import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A list of experts: a grid, or stacked for a sidebar. */
@Component({
  selector: 'ul[llPersonList]',
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'people',
    '[class.people--stacked]': 'stacked()',
    '[attr.aria-busy]': "loadingLabel() ? 'true' : null",
  },
})
export class PersonList {
  readonly stacked = input(false, { transform: booleanAttribute });
  readonly loadingLabel = input<string | null>(null);
}
