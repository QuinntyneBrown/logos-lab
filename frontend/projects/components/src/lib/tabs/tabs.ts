import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TabsVariant } from './tabs-variant';

/** A row of links to sibling views of one thing, such as the result types of a search. */
@Component({
  selector: 'nav[llTabs]',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tabs',
    '[class.tabs--pill]': "variant() === 'pill'",
    '[attr.aria-label]': 'label()',
  },
})
export class Tabs {
  readonly label = input.required<string>();
  readonly variant = input<TabsVariant>('underline');
}
