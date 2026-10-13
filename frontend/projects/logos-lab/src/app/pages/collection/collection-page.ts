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
import { COLLECTIONS_API, CollectionItem, FOLLOWS_API, ItemProgress } from '@logos-lab/api';
import {
  Alert,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  ContentCard,
  ContentCardProgress,
  ContentCardStatus,
  DescriptionList,
  EmptyState,
  Icon,
  InlineStatus,
  PageHeader,
  ProgressBar,
  Skeleton,
  SkeletonCard,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { approximateLength } from '../../content/approximate-length';
import { toContentCard } from '../../content/content-card-view';
import { plural } from '../../content/plural';
import { publicationDay } from '../../content/publication-day';
import { Session } from '../../session';
import { FollowDialogs } from '../../dialogs/follow-dialogs';
import { SignInPrompt } from '../../dialogs/sign-in-prompt';
import { unfollowCollectionData } from '../../dialogs/unfollow/unfollow-collection-data';
import { NotFoundPage } from '../not-found/not-found-page';
import { CollectionState } from './collection-state';
import { FollowStatus } from './follow-status';
import { ProgressState } from './progress-state';

@Component({
  selector: 'll-collection-page',
  imports: [
    RouterLink,
    Alert,
    Avatar,
    Breadcrumb,
    Button,
    Card,
    ContentCard,
    DescriptionList,
    EmptyState,
    Icon,
    InlineStatus,
    NotFoundPage,
    PageHeader,
    ProgressBar,
    Skeleton,
    SkeletonCard,
  ],
  templateUrl: './collection-page.html',
  styleUrl: './collection-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(COLLECTIONS_API);
  protected readonly session = inject(Session);
  private readonly router = inject(Router);
  private readonly followsApi = inject(FOLLOWS_API);
  private readonly followDialogs = inject(FollowDialogs);
  private readonly signInPrompt = inject(SignInPrompt);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });
  private readonly attempt = signal(0);
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  private readonly state = toSignal(
    toObservable(computed(() => ({ slug: this.slug(), attempt: this.attempt() }))).pipe(
      switchMap(({ slug }) =>
        this.api.getCollection(slug).pipe(
          map((collection): CollectionState => ({ kind: 'loaded', collection })),
          catchError((error: unknown) =>
            of<CollectionState>({
              kind:
                error instanceof HttpErrorResponse && error.status === 404 ? 'not-found' : 'failed',
            }),
          ),
          startWith<CollectionState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as CollectionState },
  );

  protected readonly collection = computed(() => {
    const state = this.state();
    return state.kind === 'loaded' ? state.collection : null;
  });
  protected readonly notFound = computed(() => this.state().kind === 'not-found');
  protected readonly failed = computed(() => this.state().kind === 'failed');
  protected readonly placeholders = [0, 1, 2, 3];

  /** The member's progress: asked for after the page shows, and only for a signed-in member. */
  private readonly progressState = toSignal(
    toObservable(
      computed(() => ({
        id: this.collection()?.id ?? null,
        member: this.session.member(),
        attempt: this.attempt(),
      })),
    ).pipe(
      switchMap(({ id, member }) =>
        !id || !member
          ? of<ProgressState>({ kind: 'none' })
          : this.api.getMyProgress(id).pipe(
              map((progress): ProgressState => ({ kind: 'loaded', progress })),
              catchError(() => of<ProgressState>({ kind: 'failed' })),
              startWith<ProgressState>({ kind: 'none' }),
            ),
      ),
    ),
    { initialValue: { kind: 'none' } as ProgressState },
  );
  protected readonly progress = computed(() => {
    const state = this.progressState();
    return state.kind === 'loaded' ? state.progress : null;
  });
  protected readonly progressFailed = computed(() => this.progressState().kind === 'failed');
  protected readonly progressValue = computed(() => {
    const progress = this.progress();
    return progress && progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;
  });
  protected readonly progressSummary = computed(() => {
    const progress = this.progress();
    const format = new Intl.NumberFormat(this.locale);
    const completed = format.format(progress?.completed ?? 0);
    const total = format.format(progress?.total ?? 0);
    return $localize`:@@collection.progress.summary:${completed}:completed: of ${total}:total: completed`;
  });

  /** Whether the member follows the collection: the page's answer until they press the button. */
  protected readonly following = linkedSignal(() => this.collection()?.following ?? false);
  protected readonly followerCount = linkedSignal(() => this.collection()?.followerCount ?? 0);
  protected readonly followStatus = linkedSignal<FollowStatus>(() => {
    this.collection();
    return { kind: 'none' };
  });
  protected readonly followBusy = signal(false);

  /** The follow button: a visitor is asked to sign in, a follower to confirm, anyone else follows. */
  protected press(): void {
    const collection = this.collection();
    const member = this.session.member();
    if (!collection || member === undefined || this.followBusy()) return;
    if (member === null) {
      const title = collection.title;
      void this.signInPrompt.ask({
        title: $localize`:@@collection.signIn.title:Sign in to follow ${title}:title:`,
        description: $localize`:@@collection.signIn.description:Following is free. Sign in, or create an account in about a minute, and we'll bring you straight back to ${title}:title:.`,
        returnUrl: this.router.url,
      });
    } else if (this.following()) {
      void this.followDialogs
        .confirmUnfollow(unfollowCollectionData(this.followsApi, collection.id, collection.title))
        .then((result) => {
          if (!result) return;
          this.following.set(false);
          this.followerCount.set(result.followerCount);
          this.followStatus.set({ kind: 'unfollowed' });
        });
    } else {
      this.follow(collection.id);
    }
  }

  private follow(collectionId: string): void {
    this.followBusy.set(true);
    this.followStatus.set({ kind: 'none' });
    this.followsApi.followCollection(collectionId).subscribe({
      next: (result) => {
        this.followBusy.set(false);
        this.following.set(true);
        this.followerCount.set(result.followerCount);
        this.followStatus.set({ kind: 'followed' });
      },
      error: () => {
        this.followBusy.set(false);
        this.followStatus.set({ kind: 'failed' });
      },
    });
  }

  /** Asks again for whatever failed: the collection, or the member's progress. */
  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.collection()?.title;
      if (name) title.setTitle($localize`:@@collection.pageTitle:${name}:title: - Logos Lab`);
      else if (this.notFound())
        title.setTitle($localize`:@@notFound.pageTitle:Page not found - Logos Lab`);
    });
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    {
      label: $localize`:@@collection.crumb.collections:Collections`,
      path: '/explore?type=collection',
    },
    { label: this.collection()?.title ?? '', path: null },
  ]);

  private readonly itemCount = computed(() => {
    const count = this.collection()?.itemCount ?? 0;
    const formatted = new Intl.NumberFormat(this.locale).format(count);
    return plural(this.locale, count, {
      one: $localize`:@@collection.items.one:${formatted}:count: item`,
      other: $localize`:@@collection.items.other:${formatted}:count: items`,
    });
  });
  private readonly minutes = computed(() => this.collection()?.totalMinutes ?? null);

  protected readonly eyebrow = computed(() => {
    const count = this.itemCount();
    const minutes = this.minutes();
    if (!minutes) return $localize`:@@collection.eyebrow.short:Collection · ${count}:items:`;
    const length = approximateLength(minutes);
    return $localize`:@@collection.eyebrow:Collection · ${count}:items: · about ${length}:length:`;
  });

  protected readonly rows = computed(() =>
    (this.collection()?.items ?? []).map((item, index) => {
      const card = toContentCard(item, this.locale);
      const position = index + 1;
      const mark = this.mark(item);
      return {
        ...card,
        typeLabel: $localize`:@@collection.row.type:${position}:position: · ${card.typeLabel}:type:`,
        statuses: mark.statuses,
        progress: mark.progress,
      };
    }),
  );

  /** The member's mark on one row: a badge, or a bar for an item under way. */
  private mark(item: CollectionItem): {
    statuses: readonly ContentCardStatus[];
    progress: ContentCardProgress | null;
  } {
    const entry: ItemProgress | undefined = this.progress()?.items.find(
      (candidate) => candidate.itemId === item.id,
    );
    switch (entry?.state) {
      case 'completed':
        return {
          statuses: [
            {
              label: $localize`:@@collection.state.completed:Completed`,
              tone: 'success',
              icon: 'check',
            },
          ],
          progress: null,
        };
      case 'not-started':
        return {
          statuses: [
            {
              label: $localize`:@@collection.state.notStarted:Not started`,
              tone: 'neutral',
              plain: true,
            },
          ],
          progress: null,
        };
      case 'not-passed': {
        const score = entry.score ?? 0;
        const passMark = entry.passMark ?? 0;
        return {
          statuses: [
            {
              label: $localize`:@@collection.state.notPassed:Not passed · ${score}:score:%, pass mark ${passMark}:passMark:%`,
              tone: 'warning',
            },
          ],
          progress: null,
        };
      }
      case 'in-progress':
        return {
          statuses: [],
          progress: {
            value: entry.percent ?? 0,
            label: $localize`:@@collection.state.progressLabel:Progress`,
            caption: $localize`:@@collection.state.inProgress:In progress`,
          },
        };
      default:
        return { statuses: [], progress: null };
    }
  }

  protected readonly emptyText = computed(() => {
    const title = this.collection()?.title ?? '';
    return $localize`:@@collection.empty.text:Every item in ${title}:title: has been archived or is being reviewed. Follow it to hear when items are added.`;
  });

  protected readonly length = computed(() => {
    const minutes = this.minutes();
    if (!minutes) return $localize`:@@collection.length.none:None yet`;
    const length = approximateLength(minutes);
    return $localize`:@@collection.length:About ${length}:length:`;
  });
  protected readonly updated = computed(() =>
    publicationDay(this.locale, this.collection()?.updatedAt ?? ''),
  );
  protected readonly followers = computed(() =>
    new Intl.NumberFormat(this.locale).format(this.followerCount()),
  );
  protected readonly itemTotal = computed(() =>
    new Intl.NumberFormat(this.locale).format(this.collection()?.itemCount ?? 0),
  );
}
