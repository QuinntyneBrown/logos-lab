import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
} from '@angular/core';
import { ChipSize } from './chip-size';

/** A pill that links to a topic, with an optional count of the items behind it. */
@Component({
  selector: 'a[llChip]',
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'chip',
    '[class.chip--sm]': "size() === 'sm'",
  },
})
export class Chip {
  readonly size = input<ChipSize>('md');
  readonly count = input<number | null>(null);

  private readonly locale = inject(LOCALE_ID);
  protected readonly countText = computed(() => {
    const count = this.count();
    return count === null ? null : new Intl.NumberFormat(this.locale).format(count);
  });
}
