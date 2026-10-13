import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SEARCH_API } from '@logos-lab/api';
import {
  Button,
  ContentCard,
  FormField,
  Icon,
  PageHeader,
  Person,
  PersonList,
  Search,
  SkeletonCard,
  Tab,
  Tabs,
} from '@logos-lab/components';
import { map, startWith, switchMap } from 'rxjs';
import { plural } from '../../content/plural';
import { SearchNavigation } from '../../search-navigation';
import { SearchResultsState } from './search-results-state';
import { toSearchGroups, toSearchTabs } from './search-views';

@Component({
  selector: 'll-search-results-page',
  imports: [
    RouterLink,
    Button,
    ContentCard,
    FormField,
    Icon,
    PageHeader,
    Person,
    PersonList,
    Search,
    SkeletonCard,
    Tab,
    Tabs,
  ],
  templateUrl: './search-results-page.html',
  styleUrl: './search-results-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsPage {
  protected readonly searchNavigation = inject(SearchNavigation);
  private readonly locale = inject(LOCALE_ID);
  private readonly searchApi = inject(SEARCH_API);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  protected readonly query = computed(() => (this.params().get('q') ?? '').trim());

  private readonly state = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) =>
        this.searchApi.search(query).pipe(
          map((results): SearchResultsState => ({ kind: 'loaded', results })),
          startWith<SearchResultsState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as SearchResultsState },
  );

  protected readonly loading = computed(() => this.state().kind === 'loading');
  private readonly results = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.results : null;
  });

  /** Skeleton placeholders while searching. */
  protected readonly placeholderCards = [0, 1, 2, 3];
  protected readonly loadingLabel = computed(
    () => $localize`:@@search.loading:Searching for “${this.query()}:query:”…`,
  );

  protected readonly heading = computed(
    () =>
      $localize`:@@search.heading:Results for “${this.results()?.query ?? this.query()}:query:”`,
  );

  protected readonly sub = computed(() => {
    if (this.loading()) return $localize`:@@search.sub.loading:Searching…`;
    const results = this.results();
    if (!results) return '';
    const format = new Intl.NumberFormat(this.locale);
    const total = format.format(results.total);
    const types = format.format(results.counts.length);
    const found = plural(this.locale, results.total, {
      one: $localize`:@@search.found.one:${total}:count: result`,
      other: $localize`:@@search.found.other:${total}:count: results`,
    });
    const across = plural(this.locale, results.counts.length, {
      one: $localize`:@@search.types.one:${types}:count: type`,
      other: $localize`:@@search.types.other:${types}:count: types`,
    });
    return $localize`:@@search.sub:${found}:results: across ${across}:types:, best matches first.`;
  });

  protected readonly tabs = computed(() => {
    const results = this.results();
    return results ? toSearchTabs(results, this.query()) : [];
  });

  protected readonly groups = computed(() => {
    const results = this.results();
    return results ? toSearchGroups(results, this.query(), this.locale) : [];
  });
}
