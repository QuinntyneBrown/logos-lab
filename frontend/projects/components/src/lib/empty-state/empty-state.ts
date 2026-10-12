import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';

/** Fills a region that has nothing to show, or whose content failed to load. */
@Component({
  selector: 'll-empty-state',
  imports: [Icon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly heading = input.required<string>();
  readonly headingLevel = input<2 | 3>(3);
  readonly icon = input<IconName | null>(null);
  readonly tone = input<'default' | 'error'>('default');
  readonly compact = input(false, { transform: booleanAttribute });
}
