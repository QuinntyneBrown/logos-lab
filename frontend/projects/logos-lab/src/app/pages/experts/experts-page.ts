import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EXPERTS_API, ExpertDirectory, ExpertsQuery } from '@logos-lab/api';
import { FormError } from '@logos-lab/components';
import {
  Button,
  EmptyState,
  FormField,
  FormSummary,
  PageHeader,
  Pagination,
  Person,
  PersonList,
  Search,
  SearchFilterToolbar,
  Select,
  ToolbarCount,
  ToolbarTools,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { plural } from '../../content/plural';
import { ExpertsState } from './experts-state';

/** Experts on a directory page (the API's fixed page size). */
const PAGE_SIZE = 24;

/** A name search shorter than this is refused (L2-004 AC1's rule for the directory). */
const MIN_NAME = 2;

/** A topic slug: lower-case words joined by hyphens. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Component({
  selector: 'll-experts-page',
  imports: [
    RouterLink,
    Button,
    EmptyState,
    FormField,
    FormSummary,
    PageHeader,
    Pagination,
    Person,
    PersonList,
    Search,
    SearchFilterToolbar,
    Select,
    ToolbarCount,
    ToolbarTools,
  ],
  templateUrl: './experts-page.html',
  styleUrl: './experts-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertsPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EXPERTS_API);
  private readonly router = inject(Router);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  /** The name as typed, trimmed; a search shorter than two characters is never sent. */
  protected readonly typed = computed(() => (this.params().get('q') ?? '').trim());
  protected readonly invalid = computed(() => this.typed().length === 1);
  protected readonly errors = computed<readonly FormError[]>(() =>
    this.invalid()
      ? [
          {
            controlId: 'name-search',
            message: $localize`:@@experts.search.error:Enter at least 2 characters of a name`,
          },
        ]
      : [],
  );
  protected readonly summaryHeading = $localize`:@@experts.search.summary:One thing to fix before you search`;

  /** What the address asks for. */
  protected readonly query = computed<ExpertsQuery>(
    () => {
      const page = Number(this.params().get('page'));
      const topic = this.params().get('topic') ?? '';
      return {
        q: this.typed().length >= MIN_NAME ? this.typed() : '',
        topic: SLUG.test(topic) ? topic : null,
        page: Number.isInteger(page) && page >= 1 ? page : 1,
      };
    },
    { equal: (a, b) => a.q === b.q && a.topic === b.topic && a.page === b.page },
  );
  private readonly attempt = signal(0);
  private readonly state = toSignal(
    toObservable(computed(() => ({ query: this.query(), attempt: this.attempt() }))).pipe(
      switchMap(({ query }) =>
        this.api.listExperts(query).pipe(
          map((directory): ExpertsState => ({ kind: 'loaded', directory })),
          catchError(() => of<ExpertsState>({ kind: 'failed' })),
          startWith<ExpertsState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as ExpertsState },
  );
  protected readonly loading = computed(() => this.state().kind === 'loading');
  protected readonly failed = computed(() => this.state().kind === 'failed');
  private readonly directory = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.directory : null;
  });

  /** The last topic options and total seen, so the toolbar and header hold while a request is out. */
  private readonly last = linkedSignal<ExpertsState, ExpertDirectory | null>({
    source: this.state,
    computation: (state, previous) =>
      state.kind === 'loaded' ? state.directory : (previous?.value ?? null),
  });
  protected readonly placeholders = [0, 1, 2, 3, 4, 5];
  protected readonly loadingLabel = $localize`:@@experts.loading:Loading experts…`;

  /** True when nobody is listed at all, whatever the filters. */
  protected readonly nobodyYet = computed(
    () => this.directory()?.totalExperts === 0 && this.directory()?.total === 0,
  );

  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

  protected readonly sub = computed(() => {
    const total = this.last()?.totalExperts;
    if (total === undefined) return '';
    const count = new Intl.NumberFormat(this.locale).format(total);
    return plural(this.locale, total, {
      one: $localize`:@@experts.sub.one:${count}:count: theologian, ethicist, historian, philosopher or engineer, sorted by surname.`,
      other: $localize`:@@experts.sub.other:${count}:count: theologians, ethicists, historians, philosophers and engineers, sorted by surname.`,
    });
  });

  protected readonly rows = computed(() =>
    (this.directory()?.experts ?? []).map((expert) => {
      const line = expert.focus
        ? $localize`:@@experts.row.line:${expert.title}:title: · ${expert.focus}:focus:`
        : expert.title;
      const count = new Intl.NumberFormat(this.locale).format(expert.itemCount);
      const items = plural(this.locale, expert.itemCount, {
        one: $localize`:@@experts.row.items.one:${count}:count: published item`,
        other: $localize`:@@experts.row.items.other:${count}:count: published items`,
      });
      return {
        name: expert.name,
        path: `/experts/${expert.slug}`,
        photoUrl: expert.photoUrl,
        meta: [line, items],
      };
    }),
  );

  protected readonly topics = computed(() => this.last()?.topics ?? []);
  protected readonly topicName = computed(
    () => this.topics().find((topic) => topic.slug === this.query().topic)?.name ?? null,
  );

  protected setTopic(slug: string): void {
    // A narrower list starts again at its first page; the address replaces the last one.
    this.go({ q: this.typed() || null, topic: slug || null });
  }

  protected search(text: string): void {
    this.go({ q: text.trim() || null, topic: this.query().topic });
  }

  protected clearFilters(): void {
    this.go({ q: null, topic: null });
  }

  private go(params: { q: string | null; topic: string | null }): void {
    void this.router.navigate(['/experts'], { queryParams: params, replaceUrl: true });
  }

  /** Nothing matched the search and topic that were asked for. */
  protected readonly noMatches = computed(() => {
    const directory = this.directory();
    if (!directory || directory.total > 0 || directory.totalExperts === 0) return null;
    const q = this.query().q;
    const topic = this.topicName();
    const total = new Intl.NumberFormat(this.locale).format(directory.totalExperts);
    const what =
      q && topic
        ? $localize`:@@experts.none.both:“${q}:q:” in ${topic}:topic:`
        : q
          ? $localize`:@@experts.none.q:“${q}:q:”`
          : topic;
    if (!what) return null;
    return {
      what,
      heading: $localize`:@@experts.none.title:No experts match ${what}:what:`,
      text: $localize`:@@experts.none.text:Check the spelling, or clear the filters to see all ${total}:count: experts.`,
    };
  });

  /** The search and topic the count line names after the number: "matching “Ortega” in …". */
  private readonly note = computed(() => {
    const q = this.query().q;
    const topic = this.topicName();
    if (q && topic) return $localize`:@@experts.note.both:matching “${q}:q:” in ${topic}:topic:`;
    if (q) return $localize`:@@experts.note.q:matching “${q}:q:”`;
    if (topic) return $localize`:@@experts.note.topic:in ${topic}:topic:`;
    return null;
  });

  protected readonly pageCount = computed(() => this.directory()?.pageCount ?? 0);
  protected readonly pagerLabels = {
    label: $localize`:@@experts.pager.label:Pages of experts`,
    // The pager fills in the number, so the translation keeps the placeholder.
    page: $localize`:@@experts.pager.page:Page ${'{page}'}:page:`,
    previous: $localize`:@@experts.pager.previous:Previous page`,
    next: $localize`:@@experts.pager.next:Next page`,
  };
  protected readonly pagerSummary = computed(() => {
    const format = new Intl.NumberFormat(this.locale);
    const page = format.format(this.query().page);
    const count = format.format(this.pageCount());
    return $localize`:@@experts.pager.summary:Page ${page}:page: of ${count}:count:`;
  });

  protected readonly range = computed(() => {
    const directory = this.directory();
    if (!directory || directory.total === 0) return null;
    const format = new Intl.NumberFormat(this.locale);
    const first = (directory.page - 1) * PAGE_SIZE + 1;
    return {
      from: format.format(first),
      to: format.format(first + directory.experts.length - 1),
      total: format.format(directory.total),
      note: this.note(),
      paged: directory.pageCount > 1,
      noun: plural(this.locale, directory.total, {
        one: $localize`:@@experts.noun.one:expert`,
        other: $localize`:@@experts.noun.other:experts`,
      }),
    };
  });
}
