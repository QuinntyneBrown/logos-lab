import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  LOCALE_ID,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SEARCH_API } from '@logos-lab/api';
import { Combobox } from '@logos-lab/components';
import { catchError, debounceTime, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { plural } from '../content/plural';
import { SearchNavigation } from '../search-navigation';
import { SuggestionState } from './suggestion-state';
import { toSuggestionGroups } from './suggestion-view';

const MAX_LENGTH = 200;
const CLOSED: SuggestionState = {
  open: false,
  query: '',
  groups: [],
  status: null,
  statusText: '',
  footText: null,
  announcement: '',
};

/**
 * The top bar's site search with suggestions: wide at XL, or the search row opened from the icon
 * below XL. Suggestions come 250 ms after the last keystroke, from 2 characters (search-content design).
 */
@Component({
  selector: 'll-site-search-field',
  imports: [Combobox],
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
  private readonly searchApi = inject(SEARCH_API);
  private readonly locale = inject(LOCALE_ID);
  private readonly combobox = viewChild.required(Combobox);
  private readonly queries = new Subject<string>();

  protected readonly state = signal<SuggestionState>(CLOSED);

  constructor() {
    afterNextRender(() => {
      if (this.autofocus()) this.combobox().focus();
    });
    this.queries
      .pipe(
        debounceTime(250),
        switchMap((query) => this.suggestionsFor(query)),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((state) => this.state.set(state));
  }

  protected typed(query: string): void {
    if (!query.trim()) this.state.set(CLOSED);
    this.queries.next(query);
  }

  protected submit(query: string): void {
    this.state.set(CLOSED);
    this.navigation.search(query);
    this.searchedFor.emit(query);
  }

  protected chosen(): void {
    this.state.set(CLOSED);
    this.searchedFor.emit('');
  }

  private suggestionsFor(raw: string): Observable<SuggestionState> {
    const query = raw.trim();
    if (!query) return of(CLOSED);
    if (query.length < 2) {
      const text = $localize`:@@search.suggest.tooShort:Enter at least 2 characters.`;
      return of({
        ...CLOSED,
        open: true,
        query,
        status: 'invalid',
        statusText: text,
        announcement: text,
      });
    }
    const listLimit = raw.length >= MAX_LENGTH;
    return this.searchApi.suggest(query).pipe(
      map((result): SuggestionState => {
        const groups = toSuggestionGroups(result.suggestions, this.locale);
        const count = result.suggestions.length;
        if (listLimit)
          return {
            ...CLOSED,
            open: true,
            query,
            groups,
            status: 'limit',
            statusText: $localize`:@@search.suggest.limit:Searches can be up to 200 characters, so the field stops there.`,
            footText: this.seeAll(query),
            announcement: $localize`:@@search.suggest.limitAnnouncement:200 of 200 characters.`,
          };
        if (!count)
          return {
            ...CLOSED,
            open: true,
            query,
            status: 'empty',
            statusText: $localize`:@@search.suggest.empty:No courses, experts or topics match “${query}:query:”.`,
            footText: $localize`:@@search.suggest.searchFor:Search for “${query}:query:”`,
            announcement: $localize`:@@search.suggest.emptyAnnouncement:No suggestions. Press Enter to search for ${query}:query:.`,
          };
        return {
          ...CLOSED,
          open: true,
          query,
          groups,
          footText: this.seeAll(query),
          announcement: plural(this.locale, count, {
            one: $localize`:@@search.suggest.count.one:1 suggestion. Use the up and down arrows to move through them.`,
            other: $localize`:@@search.suggest.count.other:${count}:count: suggestions. Use the up and down arrows to move through them.`,
          }),
        };
      }),
      catchError(() => {
        const text = $localize`:@@search.suggest.failed:Suggestions aren’t available right now. Press Enter to search.`;
        return of<SuggestionState>({
          ...CLOSED,
          open: true,
          query,
          status: 'failed',
          statusText: text,
          announcement: text,
        });
      }),
      startWith<SuggestionState>({
        ...CLOSED,
        open: true,
        query,
        status: 'busy',
        statusText: $localize`:@@search.suggest.busy:Searching…`,
        announcement: $localize`:@@search.suggest.busy:Searching…`,
      }),
    );
  }

  private seeAll(query: string): string {
    return $localize`:@@search.suggest.seeAll:See all results for “${query}:query:”`;
  }

  protected listLabel(): string {
    return $localize`:@@search.suggest.listLabel:Suggestions for ${this.state().query}:query:`;
  }
}
