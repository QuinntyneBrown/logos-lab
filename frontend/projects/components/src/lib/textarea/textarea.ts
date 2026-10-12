import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A multi-line native textarea styled as the design system's `.textarea`. */
@Component({
  selector: 'textarea[llTextarea]',
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'textarea',
    '[class.textarea--grow]': 'grow()',
    '[attr.aria-invalid]': 'invalid() || null',
  },
})
export class Textarea {
  /** Grows with its content instead of scrolling. */
  readonly grow = input(false, { transform: booleanAttribute });
  /** Marks the textarea invalid outside a form field, which otherwise owns `aria-invalid`. */
  readonly invalid = input(false, { transform: booleanAttribute });
}
