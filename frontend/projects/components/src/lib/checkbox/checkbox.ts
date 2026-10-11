import { ChangeDetectionStrategy, Component } from '@angular/core';

/** A checkbox row: the consumer's native box and the text that names it, one 44px target. */
@Component({
  selector: 'label[llCheck]',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'check' },
})
export class Checkbox {}
