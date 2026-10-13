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
import { ActivatedRoute } from '@angular/router';
import { TOPICS_API } from '@logos-lab/api';
import {
  Breadcrumb,
  BreadcrumbItem,
  ContentCard,
  PageHeader,
  Person,
  PersonList,
  ToolbarCount,
} from '@logos-lab/components';
import { switchMap } from 'rxjs';
import { catalogueNoun } from '../../content/catalogue-noun';
import { toContentCard } from '../../content/content-card-view';
import { plural } from '../../content/plural';

/** Items on a topic page (the API's fixed page size). */
const PAGE_SIZE = 24;

@Component({
  selector: 'll-topic-page',
  imports: [Breadcrumb, ContentCard, PageHeader, Person, PersonList, ToolbarCount],
  templateUrl: './topic-page.html',
  styleUrl: './topic-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly api = inject(TOPICS_API);
  private readonly params = toSignal(inject(ActivatedRoute).paramMap, { requireSync: true });
  protected readonly slug = computed(() => this.params().get('slug') ?? '');

  protected readonly topic = toSignal(
    toObservable(this.slug).pipe(switchMap((slug) => this.api.getTopic(slug))),
  );
  private readonly content = toSignal(
    toObservable(this.slug).pipe(switchMap((slug) => this.api.getTopicContent(slug, 1))),
  );

  constructor() {
    const title = inject(Title);
    effect(() => {
      const name = this.topic()?.name;
      if (name) title.setTitle($localize`:@@topic.pageTitle:${name}:name: - Logos Lab`);
    });
  }

  protected readonly trail = computed<readonly BreadcrumbItem[]>(() => [
    { label: $localize`:@@topic.crumb.explore:Explore`, path: '/explore' },
    { label: this.topic()?.name ?? '', path: null },
  ]);

  protected readonly sub = computed(() => {
    const topic = this.topic();
    if (!topic) return '';
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
}
