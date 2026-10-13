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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EXPERTS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Chip,
  Chips,
  ExternalLink,
  List,
  ProfileHeader,
  ProfileMeta,
  Prose,
} from '@logos-lab/components';
import { switchMap } from 'rxjs';
import { plural } from '../../content/plural';

@Component({
  selector: 'll-expert-profile-page',
  imports: [RouterLink, Breadcrumb, Card, Chip, Chips, ExternalLink, List, ProfileHeader, Prose],
  templateUrl: './expert-profile-page.html',
  styleUrl: './expert-profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertProfilePage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(EXPERTS_API);
  private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  protected readonly profile = toSignal(
    toObservable(this.slug).pipe(switchMap((slug) => this.api.getProfile(slug))),
  );

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
