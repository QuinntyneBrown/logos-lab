import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EXPERTS_API, ExpertsQuery } from '@logos-lab/api';
import {
  PageHeader,
  Pagination,
  Person,
  PersonList,
  SearchFilterToolbar,
  Select,
  ToolbarCount,
  ToolbarTools,
} from '@logos-lab/components';
import { switchMap } from 'rxjs';
import { plural } from '../../content/plural';

/** Experts on a directory page (the API's fixed page size). */
const PAGE_SIZE = 24;

/** A topic slug: lower-case words joined by hyphens. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Component({
  selector: 'll-experts-page',
  imports: [
    PageHeader,
    Pagination,
    Person,
    PersonList,
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

  /** What the address asks for. */
  protected readonly query = computed<ExpertsQuery>(() => {
    const page = Number(this.params().get('page'));
    const topic = this.params().get('topic') ?? '';
    return {
      q: '',
      topic: SLUG.test(topic) ? topic : null,
      page: Number.isInteger(page) && page >= 1 ? page : 1,
    };
  });
  private readonly directory = toSignal(
    toObservable(this.query).pipe(switchMap((query) => this.api.listExperts(query))),
  );

  protected readonly sub = computed(() => {
    const total = this.directory()?.totalExperts;
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

  protected readonly topics = computed(() => this.directory()?.topics ?? []);
  protected readonly topicName = computed(
    () => this.topics().find((topic) => topic.slug === this.query().topic)?.name ?? null,
  );

  protected setTopic(slug: string): void {
    // A narrower list starts again at its first page; the address replaces the last one.
    void this.router.navigate(['/experts'], {
      queryParams: { topic: slug || null },
      replaceUrl: true,
    });
  }

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
      topic: this.topicName(),
      paged: directory.pageCount > 1,
      noun: plural(this.locale, directory.total, {
        one: $localize`:@@experts.noun.one:expert`,
        other: $localize`:@@experts.noun.other:experts`,
      }),
    };
  });
}
