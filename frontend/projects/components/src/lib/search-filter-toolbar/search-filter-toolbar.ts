import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The bar above a list of results: its count line, tools and active filters, in the page's order. */
@Component({
  selector: 'div[llToolbar], form[llToolbar]',
  templateUrl: './search-filter-toolbar.html',
  styleUrl: './search-filter-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'toolbar',
    '[class.toolbar--stacked]': 'stacked()',
  },
})
export class SearchFilterToolbar {
  readonly stacked = input(false, { transform: booleanAttribute });
}
