import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CATALOGUE_API, CatalogueQuery, ContentType } from '@logos-lab/api';
import {
  ActiveFilter,
  ActiveFilters,
  ContentCard,
  FilterGroup,
  FilterOption,
  FilterPanel,
  PageHeader,
  SearchFilterToolbar,
  ToolbarCount,
} from '@logos-lab/components';
import { switchMap } from 'rxjs';
import { catalogueNoun } from '../../content/catalogue-noun';
import { toContentCard } from '../../content/content-card-view';
import { contentTypeLabel } from '../../content/content-labels';
import { plural } from '../../content/plural';
import { catalogueAddress, readCatalogueQuery } from './catalogue-address';
import { ExplorePill } from './explore-pill';

/** Items on a catalogue page (the API's fixed page size). */
const PAGE_SIZE = 24;

const NO_FILTERS: Pick<
  CatalogueQuery,
  'types' | 'topics' | 'levels' | 'contributors' | 'durations'
> = {
  types: [],
  topics: [],
  levels: [],
  contributors: [],
  durations: [],
};

@Component({
  selector: 'll-explore-page',
  imports: [
    NgTemplateOutlet,
    ActiveFilter,
    ActiveFilters,
    ContentCard,
    FilterGroup,
    FilterOption,
    FilterPanel,
    PageHeader,
    SearchFilterToolbar,
    ToolbarCount,
  ],
  templateUrl: './explore-page.html',
  styleUrl: './explore-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorePage {
  private readonly locale = inject(LOCALE_ID);
  private readonly router = inject(Router);
  private readonly params = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });

  /** What the address asks for; it is the only state of the page. */
  protected readonly query = computed(() => readCatalogueQuery(this.params()));
  private readonly catalogueApi = inject(CATALOGUE_API);
  private readonly catalogue = toSignal(
    toObservable(this.query).pipe(switchMap((query) => this.catalogueApi.browse(query))),
  );

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

  protected readonly typeOptions = computed(() =>
    (this.catalogue()?.facets.types ?? []).map((facet) => ({
      value: facet.value,
      label: contentTypeLabel(facet.value),
      count: facet.count,
      checked: this.query().types.includes(facet.value),
    })),
  );

  /** One removable pill per selected option, in group order. */
  protected readonly pills = computed<readonly ExplorePill[]>(() =>
    this.query().types.map((type) => {
      const label = $localize`:@@explore.pill.type:Type: ${contentTypeLabel(type)}:value:`;
      return {
        label,
        removeLabel: $localize`:@@explore.pill.remove:Remove filter ${label}:pill:`,
        remove: () => this.toggleType(type, false),
      };
    }),
  );

  /** One selected type names what the count line counts; otherwise it counts items. */
  protected readonly noun = computed(() => {
    const query = this.query();
    const total = this.catalogue()?.total ?? 0;
    const noun = catalogueNoun(
      this.locale,
      query.types.length === 1 ? query.types[0] : null,
      total,
    );
    const filters = this.pills().length;
    return filters > 1
      ? $localize`:@@explore.count.matching:${noun}:noun: that match all ${filters}:count: filters`
      : noun;
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

  protected toggleType(type: ContentType, checked: boolean): void {
    const types = this.query().types.filter((entry) => entry !== type);
    this.apply({ ...this.query(), types: checked ? [...types, type] : types });
  }

  protected clearAll(): void {
    this.apply({ ...this.query(), ...NO_FILTERS });
  }

  private apply(query: CatalogueQuery): void {
    // A filter change replaces the address, so the back button does not step through checkboxes.
    void this.router.navigate(['/explore'], {
      queryParams: catalogueAddress(query),
      replaceUrl: true,
    });
  }
}
