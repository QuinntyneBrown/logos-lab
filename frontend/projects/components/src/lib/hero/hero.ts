import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Opens a page that introduces something: a promise, or an item's title and actions. */
@Component({
  selector: 'll-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly variant = input<'default' | 'compact' | 'centred'>('default');
  readonly labelledBy = input.required<string>();
}
