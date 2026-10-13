import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { Button } from '../button/button';

/** The way to the rest of a list that grows in place: one button, a meter and a count. */
@Component({
  selector: 'div[llLoadMore]',
  imports: [Button],
  templateUrl: './load-more.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pager',
    '[hidden]': 'total() < 1',
  },
})
export class LoadMore {
  /** How many items are on the page now. */
  readonly shown = input.required<number>();
  readonly total = input.required<number>();
  /** The button's text, naming the number and the thing: "Show 6 more events". */
  readonly moreLabel = input.required<string>();
  /** The count text, translated and number-formatted by the page: "3 of 9 upcoming events". */
  readonly summary = input.required<string>();
  /** The next batch is loading. */
  readonly busy = input(false, { transform: booleanAttribute });

  /** Emitted when the button is pressed while the next batch is not already loading. */
  readonly more = output<void>();

  private readonly count = computed(() => {
    const shown = Math.trunc(this.shown());
    return Number.isFinite(shown) ? Math.min(Math.max(shown, 0), Math.max(this.total(), 0)) : 0;
  });
  protected readonly complete = computed(() => this.count() >= this.total());
  protected readonly progress = computed(
    () => `${Math.round((this.count() / Math.max(this.total(), 1)) * 100)}%`,
  );
}
