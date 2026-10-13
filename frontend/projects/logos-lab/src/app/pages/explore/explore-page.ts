import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CATALOGUE_API, CatalogueQuery } from '@logos-lab/api';
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
import {
  CATALOGUE_DURATIONS,
  CATALOGUE_LEVELS,
  catalogueDurationLabel,
  catalogueLevelLabel,
} from '../../content/catalogue-labels';
import { toContentCard } from '../../content/content-card-view';
import { contentTypeLabel } from '../../content/content-labels';
import { plural } from '../../content/plural';
import { catalogueAddress, readCatalogueQuery } from './catalogue-address';
import { ExploreOption } from './explore-option';
import { ExplorePill } from './explore-pill';
import { FilterKey } from './filter-key';

/** Items on a catalogue page (the API's fixed page size). */
const PAGE_SIZE = 24;

/** The topic and contributor lists show this many options before "Show all". */
const OPTION_LIMIT = 6;

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
  protected readonly optionLimit = OPTION_LIMIT;

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

  private readonly experts = computed(
    () =>
      this.catalogue()?.facets.contributors.filter((entry) => entry.value !== 'logos-lab') ?? [],
  );

  protected readonly sub = computed(() => {
    const experts = this.experts().length;
    const count = new Intl.NumberFormat(this.locale).format(experts);
    return plural(this.locale, experts, {
      one: $localize`:@@explore.sub.one:Every published course, module, video, article, collection and event, from ${count}:count: expert and the Logos Lab editors.`,
      other: $localize`:@@explore.sub.other:Every published course, module, video, article, collection and event, from ${count}:count: experts and the Logos Lab editors.`,
    });
  });

  protected readonly typeOptions = computed<readonly ExploreOption[]>(() =>
    (this.catalogue()?.facets.types ?? []).map((facet) => ({
      value: facet.value,
      label: contentTypeLabel(facet.value),
      count: facet.count,
      checked: this.query().types.includes(facet.value),
    })),
  );

  protected readonly topicOptions = computed<readonly ExploreOption[]>(() =>
    (this.catalogue()?.facets.topics ?? []).map((facet) => ({
      value: facet.value,
      label: facet.label,
      count: facet.count,
      checked: this.query().topics.includes(facet.value),
    })),
  );

  protected readonly levelOptions = computed<readonly ExploreOption[]>(() =>
    CATALOGUE_LEVELS.map((level) => ({
      value: level,
      label: catalogueLevelLabel(level),
      count: null,
      checked: this.query().levels.includes(level),
    })),
  );

  protected readonly contributorOptions = computed<readonly ExploreOption[]>(() =>
    (this.catalogue()?.facets.contributors ?? []).map((facet) => ({
      value: facet.value,
      label: facet.label,
      count: null,
      checked: this.query().contributors.includes(facet.value),
    })),
  );

  protected readonly durationOptions = computed<readonly ExploreOption[]>(() =>
    CATALOGUE_DURATIONS.map((duration) => ({
      value: duration,
      label: catalogueDurationLabel(duration),
      count: null,
      checked: this.query().durations.includes(duration),
    })),
  );

  protected readonly topicsMore = computed(() => {
    const count = this.topicOptions().length;
    return plural(this.locale, count, {
      one: $localize`:@@explore.topics.more.one:Show all ${count}:count: topic`,
      other: $localize`:@@explore.topics.more.other:Show all ${count}:count: topics`,
    });
  });

  protected readonly contributorsMore = computed(() => {
    const count = this.experts().length;
    return plural(this.locale, count, {
      one: $localize`:@@explore.experts.more.one:Show all ${count}:count: expert`,
      other: $localize`:@@explore.experts.more.other:Show all ${count}:count: experts`,
    });
  });

  /** One removable pill per selected option, in group order. */
  protected readonly pills = computed<readonly ExplorePill[]>(() => {
    const groups: [FilterKey, string, readonly ExploreOption[]][] = [
      ['types', $localize`:@@explore.filters.type:Type`, this.typeOptions()],
      ['topics', $localize`:@@explore.filters.topic:Topic`, this.topicOptions()],
      ['levels', $localize`:@@explore.filters.level:Level`, this.levelOptions()],
      [
        'contributors',
        $localize`:@@explore.filters.contributor:Contributor`,
        this.contributorOptions(),
      ],
      ['durations', $localize`:@@explore.filters.length:Length`, this.durationOptions()],
    ];
    return groups.flatMap(([key, group, options]) =>
      options
        .filter((option) => option.checked)
        .map((option) => {
          const label = $localize`:@@explore.pill:${group}:group:: ${option.label}:value:`;
          return {
            label,
            removeLabel: $localize`:@@explore.pill.remove:Remove filter ${label}:pill:`,
            remove: () => this.toggle(key, option.value, false),
          };
        }),
    );
  });

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

  protected toggle(key: FilterKey, value: string, checked: boolean): void {
    const query = this.query();
    const selected = (query[key] as readonly string[]).filter((entry) => entry !== value);
    this.apply({ ...query, [key]: checked ? [...selected, value] : selected });
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
