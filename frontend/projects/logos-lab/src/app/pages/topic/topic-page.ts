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
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TOPICS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ContentCard,
  EmptyState,
  PageHeader,
  Pagination,
  Person,
  PersonList,
  SkeletonCard,
  ToolbarCount,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { catalogueNoun } from '../../content/catalogue-noun';
import { toContentCard } from '../../content/content-card-view';
import { NotFoundPage } from '../not-found/not-found-page';
import { plural } from '../../content/plural';
import { TopicContentState } from './topic-content-state';
import { TopicState } from './topic-state';

/** Items on a topic page (the API's fixed page size). */
const PAGE_SIZE = 24;

@Component({
  selector: 'll-topic-page',
  imports: [
    RouterLink,
    Breadcrumb,
    Button,
    ContentCard,
    EmptyState,
    PageHeader,
    Pagination,
    Person,
    PersonList,
    SkeletonCard,
    ToolbarCount,
    NotFoundPage,
  ],
  templateUrl: './topic-page.html',
  styleUrl: './topic-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(TOPICS_API);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });
  private readonly query = toSignal(this.route.queryParamMap, { requireSync: true });
  private readonly attempt = signal(0);

  protected readonly slug = computed(() => this.params().get('slug') ?? '');
  /** The page of items, from 1; anything that is not a positive whole number is the first. */
  protected readonly page = computed(() => {
    const page = Number(this.query().get('page'));
    return Number.isInteger(page) && page >= 1 ? page : 1;
  });

  private readonly topicState = toSignal(
    toObservable(computed(() => ({ slug: this.slug(), attempt: this.attempt() }))).pipe(
      switchMap(({ slug }) =>
        this.api.getTopic(slug).pipe(
          map((topic): TopicState => ({ kind: 'loaded', topic })),
          catchError((error: unknown) =>
            of<TopicState>({
              kind:
                error instanceof HttpErrorResponse && error.status === 404 ? 'not-found' : 'failed',
            }),
          ),
          startWith<TopicState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as TopicState },
  );

  protected readonly topic = computed(() => {
    const state = this.topicState();
    return state.kind === 'loaded' ? state.topic : null;
  });
  protected readonly notFound = computed(() => this.topicState().kind === 'not-found');
  protected readonly topicFailed = computed(() => this.topicState().kind === 'failed');

  private readonly state = toSignal(
    toObservable(
      computed(() => ({ slug: this.slug(), page: this.page(), attempt: this.attempt() })),
    ).pipe(
      switchMap(({ slug, page }) =>
        this.api.getTopicContent(slug, page).pipe(
          map((content): TopicContentState => ({ kind: 'loaded', content })),
          catchError(() => of<TopicContentState>({ kind: 'failed' })),
          startWith<TopicContentState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as TopicContentState },
  );

  protected readonly loadingItems = computed(() => this.state().kind === 'loading');
  protected readonly failedItems = computed(() => this.state().kind === 'failed');
  private readonly content = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.content : null;
  });
  protected readonly noItems = computed(() => this.content()?.total === 0);
  protected readonly placeholders = [0, 1, 2, 3, 4, 5];
  protected readonly placeholderPeople = [0, 1, 2];

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.topic()?.name;
      if (name) title.setTitle($localize`:@@topic.pageTitle:${name}:name: - Logos Lab`);
      else if (this.notFound())
        title.setTitle($localize`:@@notFound.pageTitle:Page not found - Logos Lab`);
    });
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    { label: $localize`:@@topic.crumb.explore:Explore`, path: '/explore' },
    { label: this.topic()?.name ?? '', path: null },
  ]);

  protected readonly sub = computed(() => {
    const topic = this.topic();
    if (!topic) return '';
    if (this.loadingItems()) return $localize`:@@topic.sub.loading:Loading items…`;
    if (topic.itemCount === 0) return $localize`:@@topic.sub.none:No published items yet.`;
    const format = new Intl.NumberFormat(this.locale);
    const items = plural(this.locale, topic.itemCount, {
      one: $localize`:@@topic.sub.items.one:${format.format(topic.itemCount)}:count: published item`,
      other: $localize`:@@topic.sub.items.other:${format.format(topic.itemCount)}:count: published items`,
    });
    const experts = plural(this.locale, topic.experts.length, {
      one: $localize`:@@topic.sub.experts.one:${format.format(topic.experts.length)}:count: expert`,
      other: $localize`:@@topic.sub.experts.other:${format.format(topic.experts.length)}:count: experts`,
    });
    return topic.byLogosLab
      ? $localize`:@@topic.sub.withLab:${items}:items: from ${experts}:experts: and Logos Lab.`
      : $localize`:@@topic.sub:${items}:items: from ${experts}:experts:.`;
  });

  protected readonly loadingItemsLabel = computed(
    () => $localize`:@@topic.items.loading:Loading items in ${this.topic()?.name ?? ''}:name:…`,
  );
  protected readonly emptyText = computed(
    () =>
      $localize`:@@topic.empty.text:Nothing has been published in ${this.topic()?.name ?? ''}:name: yet. Until something is, the catalogue has plenty nearby.`,
  );

  protected readonly experts = computed(() =>
    (this.topic()?.experts ?? []).map((expert) => {
      const items = plural(this.locale, expert.itemCount, {
        one: $localize`:@@topic.expert.one:${expert.headline}:headline: · ${expert.itemCount}:count: item here`,
        other: $localize`:@@topic.expert.other:${expert.headline}:headline: · ${expert.itemCount}:count: items here`,
      });
      return {
        name: expert.name,
        path: `/experts/${expert.slug}`,
        photoUrl: expert.photoUrl,
        meta: [items],
      };
    }),
  );

  protected readonly cards = computed(
    () => this.content()?.items.map((item) => toContentCard(item, this.locale)) ?? [],
  );

  protected readonly range = computed(() => {
    const content = this.content();
    if (!content || content.total === 0) return null;
    const format = new Intl.NumberFormat(this.locale);
    const first = (content.page - 1) * PAGE_SIZE + 1;
    return {
      from: format.format(first),
      to: format.format(first + content.items.length - 1),
      total: format.format(content.total),
      noun: catalogueNoun(this.locale, null, content.total),
    };
  });

  protected readonly pageCount = computed(() => this.content()?.pageCount ?? 0);
  protected readonly pagerLabels = computed(() => ({
    label: $localize`:@@topic.pager.label:Pages of ${this.topic()?.name ?? ''}:name:`,
    // The pager fills in the number, so the translation keeps the placeholder.
    page: $localize`:@@topic.pager.page:Page ${'{page}'}:page:`,
    previous: $localize`:@@topic.pager.previous:Previous page`,
    next: $localize`:@@topic.pager.next:Next page`,
  }));
  protected readonly pagerSummary = computed(() => {
    const format = new Intl.NumberFormat(this.locale);
    const page = format.format(this.page());
    const count = format.format(this.pageCount());
    return $localize`:@@topic.pager.summary:Page ${page}:page: of ${count}:count:`;
  });

  /** Asks again for the same page of items. */
  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }
}
