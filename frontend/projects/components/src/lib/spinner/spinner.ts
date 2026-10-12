import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SpinnerSize } from './spinner-size';

/** A decorative ring that says work is under way; its text says what. */
@Component({
  selector: 'span[llSpinner]',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spinner',
    'aria-hidden': 'true',
    '[class.spinner--md]': "size() === 'md'",
    '[class.spinner--lg]': "size() === 'lg'",
  },
})
export class Spinner {
  readonly size = input<SpinnerSize>('sm');
}
