import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The verse that closes the home page. */
@Component({
  selector: 'll-verse',
  templateUrl: './verse.html',
  styleUrl: './verse.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Verse {
  readonly label = input.required<string>();
  readonly reference = input.required<string>();
}
