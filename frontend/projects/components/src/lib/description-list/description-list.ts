import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DescriptionListVariant } from './description-list-variant';

/**
 * A list of key facts: each `div` child holds one `dt` term and one `dd` value, and the list lays the
 * pairs out and styles them.
 */
@Component({
  selector: 'dl[llDescriptionList]',
  templateUrl: './description-list.html',
  styleUrl: './description-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'facts',
    '[class.facts--inline]': "variant() === 'inline'",
    '[class.facts--columns]': "variant() === 'columns'",
    '[attr.aria-label]': 'label()',
    '[attr.aria-busy]': 'busy() ? "true" : null',
  },
})
export class DescriptionList {
  readonly variant = input<DescriptionListVariant>('stacked');
  /** Names a stand-alone list; leave `null` when a heading already names it. */
  readonly label = input<string | null>(null);
  /** True while the values load: the list is `aria-busy`. */
  readonly busy = input(false);
}
