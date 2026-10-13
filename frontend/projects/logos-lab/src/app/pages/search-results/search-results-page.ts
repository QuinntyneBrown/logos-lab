import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
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
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { plural } from '../../content/plural';
import { parseSearchType, searchCountLabel } from '../../content/search-type-labels';
import { SearchNavigation } from '../../search-navigation';
import { readSearchFailure } from './read-search-failure';
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
  private readonly attempt = signal(0);
  private readonly request = computed(() => ({
    query: this.query(),
    type: this.type(),
    exact: this.exact(),
    attempt: this.attempt(),
  }));

  private readonly state = toSignal(
    toObservable(this.request).pipe(
      switchMap(({ query, type, exact }) => {
        if (!query) return of<SearchResultsState>({ kind: 'empty' });
        if (query.length < MIN_QUERY_LENGTH) return of<SearchResultsState>({ kind: 'invalid' });
        const options: SearchOptions = { ...(type && { type }), ...(exact && { exact }) };
        return this.searchApi.search(query, options).pipe(
          map((results): SearchResultsState => ({ kind: 'loaded', results })),
          catchError((error: unknown) => of(readSearchFailure(error, new Date()))),
          startWith<SearchResultsState>({ kind: 'loading' }),
        );
      }),
    ),
    { initialValue: { kind: 'loading' } as SearchResultsState },
  );

  protected readonly loading = computed(() => this.state().kind === 'loading');
  protected readonly failed = computed(() => this.state().kind === 'failed');
  protected readonly paused = computed(() => {
    const state = this.state();
    return state.kind === 'paused' ? state : null;
  });
  /** False while a paused search waits for `Retry-After` to pass. */
  protected readonly retryReady = signal(true);
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

  protected readonly pausedBody = computed(() => {
    const seconds = this.paused()?.seconds ?? 0;
    const duration = plural(this.locale, seconds, {
      one: $localize`:@@search.paused.seconds.one:${seconds}:count: second`,
      other: $localize`:@@search.paused.seconds.other:${seconds}:count: seconds`,
    });
    return $localize`:@@search.paused.body:To keep Logos Lab fast for everyone, searches pause briefly after 60 in a minute. You can search again in ${duration}:duration:.`;
  });
  protected readonly transcriptsMissing = computed(
    () => this.results()?.unavailable.includes('transcripts') ?? false,
  );
  protected readonly partialBody = computed(
    () =>
      $localize`:@@search.partial.body:Video transcripts aren't being searched right now, so a video that mentions “${this.results()?.query ?? ''}:query:” only when spoken may not appear. Everything else is searched as usual.`,
  );

  constructor() {
    effect((onCleanup) => {
      const paused = this.paused();
      if (!paused) {
        this.retryReady.set(true);
        return;
      }
      // The button opens by itself once `Retry-After` has passed (L2-004 AC6).
      this.retryReady.set(false);
      const timer = setTimeout(
        () => this.retryReady.set(true),
        Math.max(0, paused.until.getTime() - Date.now()),
      );
      onCleanup(() => clearTimeout(timer));
    });
  }

  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

  protected readonly heading = computed(() =>
    this.empty() || this.invalid()
      ? $localize`:@@search.title:Search Logos Lab`
      : $localize`:@@search.heading:Results for “${this.results()?.query ?? this.query()}:query:”`,
  );

  protected readonly sub = computed(() => {
    if (this.loading()) return $localize`:@@search.sub.loading:Searching…`;
    if (this.paused()) return $localize`:@@search.sub.paused:Search is paused for a moment.`;
    if (this.failed()) return $localize`:@@search.sub.failed:We couldn't run this search.`;
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
