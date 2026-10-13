import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
  output,
} from '@angular/core';
import { FilterGroup, FilterOption } from '@logos-lab/components';
import { plural } from '../../content/plural';
import { ExploreOptions } from './explore-options-view';
import { ExploreToggle } from './explore-toggle';

/** The topic and contributor lists show this many options before "Show all". */
const OPTION_LIMIT = 6;

/** The five filter groups of the catalogue, shared by the panel and the dialog. */
@Component({
  selector: 'll-explore-filter-groups',
  imports: [FilterGroup, FilterOption],
  templateUrl: './explore-filter-groups.html',
  styleUrl: './explore-filter-groups.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreFilterGroups {
  readonly options = input.required<ExploreOptions>();

  readonly toggled = output<ExploreToggle>();

  protected readonly optionLimit = OPTION_LIMIT;
  private readonly locale = inject(LOCALE_ID);

  protected readonly topicsMore = computed(() => {
    const count = this.options().topics.length;
    return plural(this.locale, count, {
      one: $localize`:@@explore.topics.more.one:Show all ${count}:count: topic`,
      other: $localize`:@@explore.topics.more.other:Show all ${count}:count: topics`,
    });
  });

  protected readonly contributorsMore = computed(() => {
    const count = this.options().contributors.filter((entry) => entry.value !== 'logos-lab').length;
    return plural(this.locale, count, {
      one: $localize`:@@explore.experts.more.one:Show all ${count}:count: expert`,
      other: $localize`:@@explore.experts.more.other:Show all ${count}:count: experts`,
    });
  });
}
