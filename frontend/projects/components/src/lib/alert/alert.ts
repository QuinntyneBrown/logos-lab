import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';
import { AlertTone } from './alert-tone';

const ICONS: Record<AlertTone, IconName> = {
  info: 'attention',
  success: 'done',
  warning: 'warning',
  danger: 'attention',
};

/** Something important about this screen, in place. */
@Component({
  selector: 'll-alert',
  imports: [Icon],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alert {
  readonly tone = input<AlertTone>('info');
  readonly heading = input.required<string>();
  readonly icon = input<IconName | null>(null);
  readonly role = input<'alert' | 'status' | 'note' | null>(null);

  protected readonly iconName = computed(() => this.icon() ?? ICONS[this.tone()]);
  protected readonly resolvedRole = computed(
    () => this.role() ?? (this.tone() === 'danger' ? 'alert' : 'status'),
  );
}
