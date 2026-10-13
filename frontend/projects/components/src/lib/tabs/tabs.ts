import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { Tab } from './tab';
import { TabsVariant } from './tabs-variant';

/** A row of links to sibling views of one thing, such as the result types of a search. */
@Component({
  selector: 'nav[llTabs], div[llTabs]',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tabs',
    '[class.tabs--pill]': "variant() === 'pill'",
    '[attr.aria-label]': 'label()',
    '[attr.role]': "isTablist ? 'tablist' : null",
    '(keydown)': 'onKeydown($any($event))',
  },
})
export class Tabs {
  readonly label = input.required<string>();
  readonly variant = input<TabsVariant>('underline');

  /** A `div` is a tablist of buttons; a `nav` is a row of links. */
  protected readonly isTablist =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'DIV';
  private readonly tabs = contentChildren(Tab, { descendants: true });

  /** Arrow keys, Home and End move through the tabs and open the one reached (automatic activation). */
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.isTablist) return;
    const tabs = this.tabs();
    const current = tabs.findIndex((tab) => tab.hasFocus());
    if (current < 0) return;
    const last = tabs.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? current === last
          ? 0
          : current + 1
        : event.key === 'ArrowLeft'
          ? current === 0
            ? last
            : current - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (next < 0) return;
    event.preventDefault();
    tabs[next].focusAndChoose();
  }
}
