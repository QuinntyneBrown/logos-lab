import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CATALOGUE_API, CatalogueQuery } from '@logos-lab/api';
import { ContentCard, PageHeader, SearchFilterToolbar, ToolbarCount } from '@logos-lab/components';
import { toContentCard } from '../../content/content-card-view';
import { plural } from '../../content/plural';

/** The catalogue's first page: no filters, newest first. */
const DEFAULT_QUERY: CatalogueQuery = {
  types: [],
  topics: [],
  levels: [],
  contributors: [],
  durations: [],
  sort: 'newest',
  page: 1,
};

/** Items on a catalogue page (the API's fixed page size). */
const PAGE_SIZE = 24;

@Component({
  selector: 'll-explore-page',
  imports: [ContentCard, PageHeader, SearchFilterToolbar, ToolbarCount],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorePage {
  private readonly locale = inject(LOCALE_ID);
  private readonly catalogue = toSignal(inject(CATALOGUE_API).browse(DEFAULT_QUERY));

  protected readonly cards = computed(
    () => this.catalogue()?.items.map((item) => toContentCard(item, this.locale)) ?? [],
  );

  protected readonly sub = computed(() => {
    const experts =
      this.catalogue()?.facets.contributors.filter((entry) => entry.value !== 'logos-lab').length ??
      0;
    const count = new Intl.NumberFormat(this.locale).format(experts);
    return plural(this.locale, experts, {
      one: $localize`:@@explore.sub.one:Every published course, module, video, article, collection and event, from ${count}:count: expert and the Logos Lab editors.`,
      other: $localize`:@@explore.sub.other:Every published course, module, video, article, collection and event, from ${count}:count: experts and the Logos Lab editors.`,
    });
  });

  protected readonly range = computed(() => {
    const page = this.catalogue();
    if (!page) return null;
    const format = new Intl.NumberFormat(this.locale);
    const first = (page.page - 1) * PAGE_SIZE + 1;
    return {
      from: format.format(first),
      to: format.format(first + page.items.length - 1),
      total: format.format(page.total),
    };
  });
}
