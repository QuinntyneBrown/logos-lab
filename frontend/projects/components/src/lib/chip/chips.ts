import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A wrapping row of chips; the consumer writes an `li` around each one. */
@Component({
  selector: 'ul[llChips]',
  templateUrl: './chips.html',
  styleUrl: './chips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'chips',
    '[attr.aria-label]': 'label()',
  },
})
export class Chips {
  readonly label = input<string | null>(null);
}
