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
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentType, EXPERTS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Chip,
  Chips,
  ContentCard,
  EmptyState,
  ExternalLink,
  List,
  ProfileHeader,
  ProfileMeta,
  Prose,
  SkeletonCard,
  Tab,
  Tabs,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toContentCard } from '../../content/content-card-view';
import { CONTENT_TYPES } from '../../content/content-types';
import { plural } from '../../content/plural';
import { searchTypeLabel } from '../../content/search-type-labels';
import { NotFoundPage } from '../not-found/not-found-page';
import { ExpertContentState } from './expert-content-state';
import { ExpertProfileState } from './expert-profile-state';

@Component({
  selector: 'll-expert-profile-page',
  imports: [
    RouterLink,
    Breadcrumb,
    Button,
    Card,
    Chip,
    Chips,
    ContentCard,
    EmptyState,
    ExternalLink,
    List,
    NotFoundPage,
    ProfileHeader,
    Prose,
    SkeletonCard,
    Tab,
    Tabs,
  ],
  templateUrl: './expert-profile-page.html',
  styleUrl: './expert-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertProfilePage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EXPERTS_API);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });
  private readonly query = toSignal(this.route.queryParamMap, { requireSync: true });
  private readonly attempt = signal(0);
  protected readonly slug = computed(() => this.params().get('slug') ?? '');
  protected readonly placeholders = [0, 1, 2];

  private readonly profileState = toSignal(
    toObservable(computed(() => ({ slug: this.slug(), attempt: this.attempt() }))).pipe(
      switchMap(({ slug }) =>
        this.api.getProfile(slug).pipe(
          map((profile): ExpertProfileState => ({ kind: 'loaded', profile })),
          catchError((error: unknown) =>
            of<ExpertProfileState>({
              kind:
                error instanceof HttpErrorResponse && error.status === 404 ? 'not-found' : 'failed',
            }),
          ),
          startWith<ExpertProfileState>({ kind: 'loading' }),
        ),
      ),
    ),
    { initialValue: { kind: 'loading' } as ExpertProfileState },
  );

  protected readonly profile = computed(() => {
    const state = this.profileState();
    return state.kind === 'loaded' ? state.profile : null;
  });
  protected readonly notFound = computed(() => this.profileState().kind === 'not-found');
  protected readonly profileFailed = computed(() => this.profileState().kind === 'failed');

  /** The tabs: the types the expert has items of, in the tabs' order. */
  protected readonly tabs = computed(() => {
    const counts = this.profile()?.counts ?? [];
    return CONTENT_TYPES.flatMap((type) => {
      const entry = counts.find((count) => count.type === type && count.count > 0);
      return entry ? [{ type, label: searchTypeLabel(type), count: entry.count }] : [];
    });
  });

  /** The selected type: the address's when the expert has items of it, else the first tab. */
  protected readonly selected = computed<ContentType | null>(() => {
    const wanted = this.query().get('type');
    const tabs = this.tabs();
    return tabs.find((tab) => tab.type === wanted)?.type ?? tabs[0]?.type ?? null;
  });

  private readonly contentState = toSignal(
    toObservable(
      computed(() => ({ slug: this.slug(), type: this.selected(), attempt: this.attempt() })),
    ).pipe(
      switchMap(({ slug, type }) =>
        type === null
          ? of<ExpertContentState>({ kind: 'loading' })
          : this.api.getContent(slug, type, 1).pipe(
              map((content): ExpertContentState => ({ kind: 'loaded', content })),
              catchError(() => of<ExpertContentState>({ kind: 'failed' })),
              startWith<ExpertContentState>({ kind: 'loading' }),
            ),
      ),
    ),
    { initialValue: { kind: 'loading' } as ExpertContentState },
  );
  protected readonly loadingItems = computed(() => this.contentState().kind === 'loading');
  protected readonly itemsFailed = computed(() => this.contentState().kind === 'failed');
  protected readonly cards = computed(() => {
    const state = this.contentState();
    return state.kind === 'loaded'
      ? state.content.items.map((item) => toContentCard(item, this.locale))
      : [];
  });

  protected select(type: ContentType): void {
    // The tab is part of the address, so it can be shared; a tab change replaces the last address.
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type },
      replaceUrl: true,
    });
  }

  /** Asks again for whatever failed: the profile, or the items of the selected tab. */
  protected retry(): void {
    this.attempt.update((n) => n + 1);
  }

  protected readonly externalLabel = $localize`:@@expert.external:(external site, opens in a new tab)`;

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.profile()?.name;
      if (name) title.setTitle($localize`:@@expert.pageTitle:${name}:name: - Logos Lab`);
      else if (this.notFound())
        title.setTitle($localize`:@@notFound.pageTitle:Page not found - Logos Lab`);
    });
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    { label: $localize`:@@expert.crumb.experts:Experts`, path: '/experts' },
    { label: this.profile()?.name ?? $localize`:@@expert.crumb.expert:Expert`, path: null },
  ]);

  protected readonly sub = computed(() => {
    const profile = this.profile();
    if (!profile) return null;
    return profile.affiliation
      ? $localize`:@@expert.sub:${profile.title}:title:, ${profile.affiliation}:affiliation:`
      : profile.title;
  });

  protected readonly meta = computed<readonly ProfileMeta[]>(() => {
    const profile = this.profile();
    if (!profile) return [];
    const format = new Intl.NumberFormat(this.locale);
    return [
      {
        icon: 'people',
        text: plural(this.locale, profile.followerCount, {
          one: $localize`:@@expert.followers.one:${format.format(profile.followerCount)}:count: follower`,
          other: $localize`:@@expert.followers.other:${format.format(profile.followerCount)}:count: followers`,
        }),
      },
      {
        icon: 'course',
        text: plural(this.locale, profile.itemCount, {
          one: $localize`:@@expert.items.one:${format.format(profile.itemCount)}:count: published item`,
          other: $localize`:@@expert.items.other:${format.format(profile.itemCount)}:count: published items`,
        }),
      },
    ];
  });

  protected readonly emptyText = computed(
    () =>
      $localize`:@@expert.empty.text:${this.profile()?.name ?? ''}:name: is new to Logos Lab. Until something is published, the catalogue has plenty to read and watch.`,
  );
}
