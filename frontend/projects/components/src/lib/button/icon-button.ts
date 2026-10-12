import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A round, icon-only target (`.icon-btn`); the consumer names it with `aria-label`. */
@Component({
  selector: 'button[llIconButton], a[llIconButton]',
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon-btn',
    '[class.icon-btn--sm]': "size() === 'sm'",
    '[attr.aria-pressed]': 'pressed() === null ? null : pressed()',
  },
})
export class IconButton {
  readonly size = input<'md' | 'sm'>('md');
  readonly count = input<number | null>(null);
  readonly pressed = input<boolean | null>(null);
}
