import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
} from '@angular/core';
import { Badge } from '../badge/badge';
import { Tabs } from './tabs';

/** One link in a row of tabs, with an optional count. */
@Component({
  selector: 'a[llTab]',
  imports: [Badge],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tab',
    '[attr.aria-current]': "current() ? 'page' : null",
    '[class.tab--pill]': "tabs?.variant() === 'pill'",
  },
})
export class Tab {
  readonly count = input<number | null>(null);
  readonly current = input(false, { transform: booleanAttribute });

  protected readonly tabs = inject(Tabs, { optional: true });
  private readonly locale = inject(LOCALE_ID);
  protected readonly countText = computed(() => {
    const count = this.count();
    return count === null ? null : new Intl.NumberFormat(this.locale).format(count);
  });
}
