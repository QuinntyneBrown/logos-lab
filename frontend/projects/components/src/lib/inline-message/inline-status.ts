import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';
import { Spinner } from '../spinner/spinner';
import { InlineStatusTone } from './inline-status-tone';

const ICONS: Record<InlineStatusTone, IconName | null> = {
  neutral: null,
  success: 'check',
  warning: 'warning',
  danger: 'attention',
};

/** A short status line beside the thing it is about: "Profile saved…", "Saving…". */
@Component({
  selector: 'p[llInlineStatus], span[llInlineStatus]',
  imports: [Icon, Spinner],
  templateUrl: './inline-status.html',
  styleUrl: './inline-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-status',
    '[class.inline-status--success]': "tone() === 'success'",
    '[class.inline-status--warning]': "tone() === 'warning'",
    '[class.inline-status--danger]': "tone() === 'danger'",
    '[attr.role]': "live() === 'polite' ? 'status' : live() === 'assertive' ? 'alert' : null",
  },
})
export class InlineStatus {
  readonly tone = input<InlineStatusTone>('neutral');
  /** `undefined` uses the tone's icon, `null` shows none. */
  readonly icon = input<IconName | null | undefined>(undefined);
  readonly busy = input(false, { transform: booleanAttribute });
  readonly live = input<'polite' | 'assertive' | null>(null);

  protected readonly iconName = computed(() => {
    const icon = this.icon();
    return icon === undefined ? ICONS[this.tone()] : icon;
  });
}
