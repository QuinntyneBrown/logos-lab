import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentType, EXPERTS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Chip,
  Chips,
  ContentCard,
  ExternalLink,
  List,
  ProfileHeader,
  ProfileMeta,
  Prose,
  Tab,
  Tabs,
} from '@logos-lab/components';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { toContentCard } from '../../content/content-card-view';
import { CONTENT_TYPES } from '../../content/content-types';
import { plural } from '../../content/plural';
import { searchTypeLabel } from '../../content/search-type-labels';
import { ExpertContentState } from './expert-content-state';

@Component({
  selector: 'll-expert-profile-page',
  imports: [
    RouterLink,
    Breadcrumb,
    Card,
    Chip,
    Chips,
    ContentCard,
    ExternalLink,
    List,
    ProfileHeader,
    Prose,
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
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  protected readonly profile = toSignal(
    toObservable(this.slug).pipe(switchMap((slug) => this.api.getProfile(slug))),
  );

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
  protected readonly selectedTab = computed(() =>
    this.tabs().find((tab) => tab.type === this.selected()),
  );

  private readonly state = toSignal(
    toObservable(computed(() => ({ slug: this.slug(), type: this.selected() }))).pipe(
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
  protected readonly cards = computed(() => {
    const state = this.state();
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

  protected readonly externalLabel = $localize`:@@expert.external:(external site, opens in a new tab)`;

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.profile()?.name;
      if (name) title.setTitle($localize`:@@expert.pageTitle:${name}:name: - Logos Lab`);
    });
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    { label: $localize`:@@expert.crumb.experts:Experts`, path: '/experts' },
    { label: this.profile()?.name ?? '', path: null },
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
}
