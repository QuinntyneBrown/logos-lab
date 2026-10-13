import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ARTICLES_API, ContentType, RELATED_CONTENT_API, SAVED_ITEMS_API } from '@logos-lab/api';
import {
  Alert,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Chip,
  Chips,
  ContentCard,
  EmptyState,
  Icon,
  PageHeader,
  Prose,
  Skeleton,
} from '@logos-lab/components';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { ContentCardView, toContentCard } from '../../content/content-card-view';
import { plural } from '../../content/plural';
import { publicationDay } from '../../content/publication-day';
import { SignInPrompt } from '../../dialogs/sign-in-prompt';
import { Session } from '../../session';
import { NotFoundPage } from '../not-found/not-found-page';
import { ArticleState } from './article-state';
import { readSaveFailure } from './read-save-failure';
import { SaveStatus } from './save-status';

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
    EmptyState,
    Icon,
    NotFoundPage,
    PageHeader,
    Prose,
    Skeleton,
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
  private readonly savedApi = inject(SAVED_ITEMS_API);
  private readonly signInPrompt = inject(SignInPrompt);
  private readonly router = inject(Router);
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
  protected readonly failed = computed(() => this.state().kind === 'failed');

  /** Asks again for the article after a failure. */
  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

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

  /** Whether the member saved the article: the page's answer until they press the button. */
  protected readonly saved = linkedSignal(() => this.article()?.saved ?? false);
  protected readonly saveBusy = signal(false);
  protected readonly saveStatus = linkedSignal<SaveStatus>(() => {
    this.article();
    return { kind: 'none' };
  });

  /** The save button: a visitor is asked to sign in, a member saves or removes. */
  protected toggleSave(): void {
    const article = this.article();
    const member = this.session.member();
    if (!article || member === undefined || this.saveBusy()) return;
    if (member === null) {
      const returnUrl = this.router.url;
      void this.signInPrompt.ask({
        title: $localize`:@@article.signIn.title:Sign in to save this article`,
        description: $localize`:@@article.signIn.description:Saving is free. Sign in, or create an account in about a minute, and we'll bring you straight back to this article.`,
        returnUrl,
      });
      return;
    }
    const removing = this.saved();
    this.saveBusy.set(true);
    this.saveStatus.set({ kind: 'none' });
    this.send('article', article.id, !removing).subscribe({
      next: () => {
        this.saveBusy.set(false);
        this.saved.set(!removing);
        this.saveStatus.set({ kind: removing ? 'removed' : 'saved' });
      },
      error: (error: unknown) => {
        this.saveBusy.set(false);
        this.saveStatus.set(readSaveFailure(error, article.title));
      },
    });
  }

  /** What the member changed on related cards, by item id, over what the page loaded. */
  private readonly cardChoices = signal<Readonly<Record<string, boolean>>>({});

  /** The related cards with the member's saved state; a visitor's cards have no toggle. */
  protected readonly cards = computed(() => {
    const member = this.session.member();
    const choices = this.cardChoices();
    return this.related().map((card) => {
      const saved = choices[card.id] ?? card.saved ?? false;
      return {
        ...card,
        saved: member ? saved : null,
        saveLabel: this.saveLabel(card.title, saved),
      };
    });
  });

  private saveLabel(title: string, saved: boolean): string {
    return saved
      ? $localize`:@@article.card.saved:Saved: ${title}:title:`
      : $localize`:@@article.card.save:Save ${title}:title:`;
  }

  /** A related card's save toggle was pressed. */
  protected saveCard(card: ContentCardView, save: boolean): void {
    this.saveStatus.set({ kind: 'none' });
    this.cardChoices.update((choices) => ({ ...choices, [card.id]: save }));
    this.send(card.type, card.id, save).subscribe({
      error: (error: unknown) => {
        this.cardChoices.update((choices) => ({ ...choices, [card.id]: !save }));
        this.saveStatus.set(readSaveFailure(error, card.title));
      },
    });
  }

  private send(type: ContentType, id: string, save: boolean): Observable<void> {
    return save ? this.savedApi.save(type, id) : this.savedApi.unsave(type, id);
  }

  protected readonly saveAnnouncement = computed(() => {
    switch (this.saveStatus().kind) {
      case 'saved':
        return $localize`:@@article.save.saved:Saved`;
      case 'removed':
        return $localize`:@@article.save.removed:Removed from Saved`;
      default:
        return '';
    }
  });
  protected readonly saveFullBody = computed(() => {
    const status = this.saveStatus();
    const title = status.kind === 'full' ? status.title : '';
    return $localize`:@@article.save.full.body:You have 1,000 saved items, the most Saved can hold, so we couldn't save ${title}:title:. Remove something you've finished with, then save it again.`;
  });

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
