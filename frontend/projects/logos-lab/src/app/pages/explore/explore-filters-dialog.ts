import { BreakpointObserver } from '@angular/cdk/layout';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { CATALOGUE_API, CatalogueQuery } from '@logos-lab/api';
import { Button, Drawer, FilterPanel } from '@logos-lab/components';
import { catchError, debounceTime, of, skip, switchMap, tap } from 'rxjs';
import { catalogueNoun } from '../../content/catalogue-noun';
import { plural } from '../../content/plural';
import { ExploreFilterGroups } from './explore-filter-groups';
import { ExploreFiltersDialogData } from './explore-filters-dialog-data';
import { exploreOptions } from './explore-options';
import { ExploreToggle } from './explore-toggle';

/** The window width from which the filters sit beside the results instead (LG, 64 rem). */
const LG = '(min-width: 64rem)';

/** How long after the last change the count is asked for. */
const COUNT_DELAY = 300;

/** The filters below LG: a draft the member shapes, applied to the address only when asked. */
@Component({
  selector: 'll-explore-filters-dialog',
  imports: [Button, Drawer, FilterPanel, ExploreFilterGroups],
  templateUrl: './explore-filters-dialog.html',
  styleUrl: './explore-filters-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreFiltersDialog {
  private readonly ref = inject<DialogRef<CatalogueQuery | undefined>>(DialogRef);
  protected readonly data = inject<ExploreFiltersDialogData>(DIALOG_DATA);
  private readonly locale = inject(LOCALE_ID);
  private readonly catalogueApi = inject(CATALOGUE_API);

  protected readonly draft = signal<CatalogueQuery>(this.data.query);
  private readonly total = signal(this.data.total);
  /** True from a change until its count arrives. */
  protected readonly counting = signal(false);

  protected readonly options = computed(() => exploreOptions(this.data.facets, this.draft()));
  protected readonly selected = computed(() => {
    const options = this.options();
    return [
      options.types,
      options.topics,
      options.levels,
      options.contributors,
      options.durations,
    ].reduce((sum, list) => sum + list.filter((option) => option.checked).length, 0);
  });

  protected readonly summary = computed(() => {
    const filters = this.selected();
    if (filters === 0)
      return $localize`:@@explore.dialog.summary.none:Choose as many as you like. The count updates as you go.`;
    return plural(this.locale, filters, {
      one: $localize`:@@explore.dialog.summary.one:${filters}:count: filter on. The count updates as you go.`,
      other: $localize`:@@explore.dialog.summary.other:${filters}:count: filters on. The count updates as you go.`,
    });
  });

  private readonly noun = computed(() => {
    const types = this.draft().types;
    return catalogueNoun(this.locale, types.length === 1 ? types[0] : null, this.total());
  });

  /** The primary button states the result, or that it is being counted. */
  protected readonly primary = computed(() => {
    const noun = this.noun();
    if (this.counting()) return $localize`:@@explore.dialog.counting:Counting ${noun}:noun:…`;
    const count = new Intl.NumberFormat(this.locale).format(this.total());
    return $localize`:@@explore.dialog.show:Show ${count}:count: ${noun}:noun:`;
  });

  constructor() {
    // The count refreshes shortly after the last change; the draft is not the address yet.
    toObservable(this.draft)
      .pipe(
        skip(1),
        debounceTime(COUNT_DELAY),
        switchMap((query) =>
          this.catalogueApi.browse({ ...query, page: 1 }).pipe(
            tap((page) => this.total.set(page.total)),
            catchError(() => of(null)),
          ),
        ),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.counting.set(false));

    // From LG the panel beside the results takes over, so the dialog closes.
    inject(BreakpointObserver)
      .observe(LG)
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((state) => {
        if (state.matches) this.ref.close();
      });
  }

  protected toggle(change: ExploreToggle): void {
    const draft = this.draft();
    const selected = (draft[change.key] as readonly string[]).filter(
      (entry) => entry !== change.value,
    );
    this.counting.set(true);
    this.draft.set({
      ...draft,
      [change.key]: change.checked ? [...selected, change.value] : selected,
    });
  }

  protected clear(): void {
    this.counting.set(true);
    this.draft.set({
      ...this.draft(),
      types: [],
      topics: [],
      levels: [],
      contributors: [],
      durations: [],
    });
  }

  protected apply(): void {
    this.ref.close(this.draft());
  }

  protected cancel(): void {
    this.ref.close();
  }
}
