import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Spinner } from './spinner';

/** The body of a card while a link is checked: a large spinner over a polite status message. */
@Component({
  selector: 'll-spinner-region',
  imports: [Spinner],
  templateUrl: './spinner-region.html',
  styleUrl: './spinner-region.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerRegion {
  readonly message = input.required<string>();
}
