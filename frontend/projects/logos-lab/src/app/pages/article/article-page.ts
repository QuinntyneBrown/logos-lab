import { HttpErrorResponse } from '@angular/common/http';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ARTICLES_API, RELATED_CONTENT_API } from '@logos-lab/api';
import {
  Alert,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Chip,
  Chips,
  ContentCard,
  Icon,
  PageHeader,
  Prose,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toContentCard } from '../../content/content-card-view';
import { plural } from '../../content/plural';
import { publicationDay } from '../../content/publication-day';
import { Session } from '../../session';
import { NotFoundPage } from '../not-found/not-found-page';
import { ArticleState } from './article-state';

@Component({
  selector: 'll-article-page',
  imports: [
    RouterLink,
    Alert,
    Avatar,
    Breadcrumb,
    Button,
    Chip,
    Chips,
    ContentCard,
    Icon,
    NotFoundPage,
    PageHeader,
    Prose,
  ],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(ARTICLES_API);
  private readonly relatedApi = inject(RELATED_CONTENT_API);
  protected readonly session = inject(Session);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });
  private readonly attempt = signal(0);
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  private readonly state = toSignal(
    toObservable(computed(() => ({ slug: this.slug(), attempt: this.attempt() }))).pipe(
      switchMap(({ slug }) =>
        this.api.getArticle(slug).pipe(
          map((article): ArticleState => ({ kind: 'loaded', article })),
          catchError((error: unknown) =>
            of<ArticleState>({
              kind:
                error instanceof HttpErrorResponse && error.status === 404 ? 'not-found' : 'failed',
            }),
          ),
          startWith<ArticleState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as ArticleState },
  );

  protected readonly article = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.article : null;
  });
  protected readonly notFound = computed(() => this.state().kind === 'not-found');

  /** The related items as cards; a failed request is the same as nothing related. */
  protected readonly related = toSignal(
    toObservable(computed(() => this.article()?.id ?? null)).pipe(
      switchMap((id) =>
        id === null
          ? of([])
          : this.relatedApi.getRelated(id).pipe(
              map((items) => items.slice(0, 4).map((item) => toContentCard(item, this.locale))),
              catchError(() => of([])),
            ),
      ),
    ),
    { initialValue: [] },
  );

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.article()?.title;
      if (name) title.setTitle($localize`:@@article.pageTitle:${name}:title: - Logos Lab`);
      else if (this.notFound())
        title.setTitle($localize`:@@notFound.pageTitle:Page not found - Logos Lab`);
    });
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => {
    const topic = this.article()?.topics[0];
    return [
      { label: $localize`:@@article.crumb.explore:Explore`, path: '/explore' },
      ...(topic ? [{ label: topic.name, path: `/topics/${topic.slug}` }] : []),
      { label: $localize`:@@article.crumb.article:Article`, path: null },
    ];
  });

  protected readonly eyebrow = computed(() => {
    const minutes = this.article()?.readingMinutes ?? 1;
    return $localize`:@@article.eyebrow:Article · ${minutes}:minutes: min read`;
  });
  protected readonly published = computed(() =>
    publicationDay(this.locale, this.article()?.publishedAt ?? ''),
  );
  protected readonly correctionTitle = computed(() => {
    const day = this.article()?.correction?.date;
    const date = day ? publicationDay(this.locale, day) : '';
    return $localize`:@@article.correction.title:Corrected on ${date}:date:`;
  });
  protected readonly commentCount = computed(() =>
    new Intl.NumberFormat(this.locale).format(this.article()?.commentCount ?? 0),
  );
  protected readonly commentsLabel = computed(() => {
    const count = this.article()?.commentCount ?? 0;
    const formatted = this.commentCount();
    return plural(this.locale, count, {
      one: $localize`:@@article.comments.one:${formatted}:count: comment`,
      other: $localize`:@@article.comments.other:${formatted}:count: comments`,
    });
  });
  protected readonly updated = computed(() => {
    const day = this.article()?.updatedAt;
    return day ? publicationDay(this.locale, day) : null;
  });
}
