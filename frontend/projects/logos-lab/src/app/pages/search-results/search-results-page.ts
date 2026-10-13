import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SEARCH_API, SearchOptions } from '@logos-lab/api';
import {
  Alert,
  Button,
  Chip,
  Chips,
  ContentCard,
  EmptyState,
  FormError,
  FormField,
  FormSummary,
  Icon,
  PageHeader,
  Person,
  PersonList,
  Search,
  SkeletonCard,
  Tab,
  Tabs,
} from '@logos-lab/components';
import { map, of, startWith, switchMap } from 'rxjs';
import { plural } from '../../content/plural';
import { parseSearchType, searchCountLabel } from '../../content/search-type-labels';
import { SearchNavigation } from '../../search-navigation';
import { SearchResultsState } from './search-results-state';
import { toSearchGroups, toSearchTabs } from './search-views';

/** A query shorter than this, once trimmed, is not searched (L2-004 AC1). */
const MIN_QUERY_LENGTH = 2;

@Component({
  selector: 'll-search-results-page',
  imports: [
    RouterLink,
    Alert,
    Button,
    Chip,
    Chips,
    ContentCard,
    EmptyState,
    FormField,
    FormSummary,
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
  /** The selected result type; an unknown one is ignored. */
  protected readonly type = computed(() => parseSearchType(this.params().get('type')));
  /** `exact=true` searches the text as typed, without spelling correction. */
  private readonly exact = computed(() => this.params().get('exact') === 'true');
  private readonly request = computed(() => ({
    query: this.query(),
    type: this.type(),
    exact: this.exact(),
  }));

  private readonly state = toSignal(
    toObservable(this.request).pipe(
      switchMap(({ query, type, exact }) => {
        if (!query) return of<SearchResultsState>({ kind: 'empty' });
        if (query.length < MIN_QUERY_LENGTH) return of<SearchResultsState>({ kind: 'invalid' });
        const options: SearchOptions = { ...(type && { type }), ...(exact && { exact }) };
        return this.searchApi.search(query, options).pipe(
          map((results): SearchResultsState => ({ kind: 'loaded', results })),
          startWith<SearchResultsState>({ kind: 'loading' }),
        );
      }),
    ),
    { initialValue: { kind: 'loading' } as SearchResultsState },
  );

  protected readonly loading = computed(() => this.state().kind === 'loading');
  protected readonly empty = computed(() => this.state().kind === 'empty');
  protected readonly invalid = computed(() => this.state().kind === 'invalid');

  protected readonly help = $localize`:@@search.help:Searches titles, summaries, full text, video transcripts, topics and expert names.`;
  protected readonly summaryHeading = $localize`:@@search.summary:One thing to fix before you search`;
  protected readonly errors = computed<readonly FormError[]>(() =>
    this.invalid()
      ? [{ controlId: 'q', message: $localize`:@@search.error.short:Enter at least 2 characters` }]
      : [],
  );
  protected readonly fieldError = computed(() => this.errors()[0]?.message ?? null);
  private readonly results = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.results : null;
  });

  /** Skeleton placeholders while searching. */
  protected readonly placeholderCards = [0, 1, 2, 3];
  protected readonly loadingLabel = computed(
    () => $localize`:@@search.loading:Searching for “${this.query()}:query:”…`,
  );

  protected readonly heading = computed(() =>
    this.empty() || this.invalid()
      ? $localize`:@@search.title:Search Logos Lab`
      : $localize`:@@search.heading:Results for “${this.results()?.query ?? this.query()}:query:”`,
  );

  protected readonly sub = computed(() => {
    if (this.loading()) return $localize`:@@search.sub.loading:Searching…`;
    if (this.empty() || this.invalid())
      return $localize`:@@search.sub.idle:Try a topic, a question, a book of the Bible or an expert's name.`;
    const results = this.results();
    if (!results) return '';
    if (results.total === 0) return $localize`:@@search.sub.none:No results.`;
    const type = this.type();
    if (type) {
      const count = results.counts.find((entry) => entry.type === type)?.count ?? 0;
      const label = searchCountLabel(this.locale, type, count);
      return $localize`:@@search.sub.type:${label}:count:, best matches first.`;
    }
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
    return results?.total ? toSearchTabs(results, this.query(), this.type()) : [];
  });

  /** The query the API searched for instead, when it corrected the one typed. */
  protected readonly correctedFrom = computed(() => this.results()?.correctedFrom ?? null);
  protected readonly correctedHeading = computed(
    () =>
      $localize`:@@search.corrected.title:Showing results for “${this.results()?.query ?? ''}:query:”`,
  );

  /** What to show when nothing matched: the query and the popular topics. */
  protected readonly noMatch = computed(() => {
    const results = this.results();
    if (!results || results.total > 0) return null;
    return {
      heading: $localize`:@@search.none.title:Nothing matches “${results.query}:query:”`,
      topics: results.popularTopics.map((topic) => ({
        name: topic.name,
        path: `/topics/${topic.slug}`,
        count: topic.itemCount,
      })),
    };
  });

  protected readonly groups = computed(() => {
    const results = this.results();
    return results ? toSearchGroups(results, this.query(), this.locale) : [];
  });
}
