import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonGroupVariant } from './button-group-variant';

/** A row of related buttons; segmented, it switches between views of the same content. */
@Component({
  selector: 'div[llButtonGroup]',
  templateUrl: './button-group.html',
  styleUrl: './button-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btn-group',
    '[class.btn-group--segmented]': "variant() === 'segmented'",
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
})
export class ButtonGroup {
  /** Names the task the buttons serve: "Show times in". */
  readonly label = input.required<string>();
  readonly variant = input<ButtonGroupVariant>('actions');
}
