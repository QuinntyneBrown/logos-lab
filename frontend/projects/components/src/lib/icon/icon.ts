import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconName } from './icon-name';
import { ICONS } from './icons';

/** Inlines a named line icon into the consumer's own `<svg>`; always decorative. */
@Component({
  // The selector rule does not parse SVG hosts; the selector follows the attribute convention.
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[llIcon]',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'icon',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    '[class.icon--sm]': "size() === 'sm'",
    '[class.icon--lg]': "size() === 'lg'",
  },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly shapes = computed(() => ICONS[this.name()]);
}
