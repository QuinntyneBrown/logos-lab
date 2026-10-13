import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  Injector,
  input,
  model,
} from '@angular/core';
import { Button } from '../button/button';
import { FilterOption } from './filter-option';

/** One filter of the panel: its legend, a list of options and an optional "Show all". */
@Component({
  selector: 'fieldset[llFilterGroup]',
  imports: [Button],
  templateUrl: './filter-group.html',
  styleUrl: './filter-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'filter' },
})
export class FilterGroup {
  readonly label = input.required<string>();
  /** The native `name` of each option's checkbox. */
  readonly name = input<string | null>(null);
  /** With a number and more options than that, the rest stay hidden until the group is expanded. */
  readonly limit = input<number | null>(null);
  /** The expander's text: "Show all 12 topics". */
  readonly moreLabel = input<string | null>(null);
  /** True shows every option. It turns true by itself when a checked option lies beyond `limit`. */
  readonly expanded = model(false);

  private readonly options = contentChildren(FilterOption, { descendants: true });
  private readonly injector = inject(Injector);

  /** A checked option beyond the limit must not stay hidden (filter-group rule D-9). */
  private readonly checkedBeyondLimit = computed(() => {
    const limit = this.limit();
    return (
      limit !== null && this.options().some((option, index) => index >= limit && option.checked())
    );
  });
  private readonly showAll = computed(
    () => this.limit() === null || this.expanded() || this.checkedBeyondLimit(),
  );

  protected readonly canExpand = computed(() => {
    const limit = this.limit();
    return !this.showAll() && limit !== null && this.options().length > limit && !!this.moreLabel();
  });

  constructor() {
    effect(() => {
      if (this.checkedBeyondLimit()) this.expanded.set(true);
    });
  }

  /** Whether an option is among the ones hidden behind "Show all". */
  isHidden(option: FilterOption): boolean {
    const limit = this.limit();
    if (this.showAll() || limit === null) return false;
    return this.options().indexOf(option) >= limit;
  }

  protected expand(): void {
    const limit = this.limit() ?? 0;
    const first = this.options()[limit];
    this.expanded.set(true);
    // The first revealed option takes focus, so the keyboard stays where the new options are.
    afterNextRender(() => first?.focus(), { injector: this.injector });
  }
}
