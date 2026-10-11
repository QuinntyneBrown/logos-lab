import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InputSize } from './input-size';

/** A single-line native input styled as the design system's `.input`. */
@Component({
  selector: 'input[llInput]',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'input',
    '[class.input--sm]': "size() === 'sm'",
    '[class.input--md]': "size() === 'md'",
    '[attr.aria-invalid]': 'invalid() || null',
  },
})
export class Input {
  readonly size = input<InputSize>('lg');
  readonly invalid = input(false, { transform: booleanAttribute });
}
