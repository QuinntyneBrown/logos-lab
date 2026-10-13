import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  LOCALE_ID,
  output,
} from '@angular/core';
import { Badge } from '../badge/badge';
import { Tabs } from './tabs';

/** One tab: a link to a view of another route, or a button that selects a panel of this page. */
@Component({
  selector: 'a[llTab], button[llTab]',
  imports: [Badge],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tab',
    '[class.tab--pill]': "tabs?.variant() === 'pill'",
    '[attr.aria-current]': "!isButton && current() ? 'page' : null",
    '[attr.role]': "isButton ? 'tab' : null",
    '[attr.type]': "isButton ? 'button' : null",
    '[attr.aria-selected]': 'isButton ? selected() : null',
    '[attr.tabindex]': 'isButton ? (selected() ? 0 : -1) : null',
    '[attr.aria-controls]': 'isButton ? panelId() : null',
    '[attr.disabled]': 'isButton && disabled() ? "" : null',
    '(click)': 'choose()',
  },
})
export class Tab {
  readonly count = input<number | null>(null);
  /** Links only: this is the page the list is on. */
  readonly current = input(false, { transform: booleanAttribute });
  /** Buttons only: this is the selected tab. The page owns the state. */
  readonly selected = input(false, { transform: booleanAttribute });
  /** Buttons only: the id of the panel this tab shows. */
  readonly panelId = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Emitted when a button tab that is not selected is chosen, by pointer or by key. */
  readonly activated = output<void>();

  protected readonly tabs = inject(Tabs, { optional: true });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly isButton = this.element.tagName === 'BUTTON';
  private readonly locale = inject(LOCALE_ID);
  protected readonly countText = computed(() => {
    const count = this.count();
    return count === null ? null : new Intl.NumberFormat(this.locale).format(count);
  });

  /** Moves focus here and selects it: the way arrow keys move through a tablist. */
  focusAndChoose(): void {
    this.element.focus();
    this.choose();
  }

  /** Whether this tab holds keyboard focus. */
  hasFocus(): boolean {
    return this.element === this.element.ownerDocument.activeElement;
  }

  protected choose(): void {
    if (this.isButton && !this.selected() && !this.disabled()) this.activated.emit();
  }
}
