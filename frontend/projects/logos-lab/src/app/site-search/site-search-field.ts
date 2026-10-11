import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Search } from '@logos-lab/components';
import { SearchNavigation } from '../search-navigation';

/** The top bar's site search: wide at XL, or the search row opened from the icon below XL. */
@Component({
  selector: 'll-site-search-field',
  imports: [Search],
  templateUrl: './site-search-field.html',
  styleUrl: './site-search-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The row's class sits on the host, a direct child of the top bar's row, so the top bar can wrap
  // it onto its own line below MD.
  host: { '[class.header__search]': "variant() === 'row'" },
})
export class SiteSearchField {
  readonly variant = input<'wide' | 'row'>('wide');
  /** Focus the query as soon as the field appears (the search row). */
  readonly autofocus = input(false);

  readonly dismissed = output<void>();
  readonly searchedFor = output<string>();

  private readonly navigation = inject(SearchNavigation);
  private readonly search = viewChild.required(Search);

  constructor() {
    afterNextRender(() => {
      if (this.autofocus()) this.search().focus();
    });
  }

  protected submit(query: string): void {
    this.navigation.search(query);
    this.searchedFor.emit(query);
  }

  protected keydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.variant() === 'row') {
      event.preventDefault();
      this.dismissed.emit();
    }
  }
}
