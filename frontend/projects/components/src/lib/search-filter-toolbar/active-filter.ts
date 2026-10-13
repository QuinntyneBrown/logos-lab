import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconButton } from '../button/icon-button';
import { Icon } from '../icon/icon';

/** One filter that is on, as a pill with a button that removes it. */
@Component({
  selector: 'li[llActiveFilter]',
  imports: [IconButton, Icon],
  templateUrl: './active-filter.html',
  styleUrl: './active-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveFilter {
  /** The pill's text: "Type: Course". */
  readonly label = input.required<string>();
  /** The remove button's name: "Remove filter Type: Course". */
  readonly removeLabel = input.required<string>();

  readonly removed = output<void>();
}
