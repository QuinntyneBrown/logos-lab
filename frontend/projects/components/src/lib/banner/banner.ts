import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { IconButton } from '../button/icon-button';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';
import { BannerTone } from './banner-tone';

const ICONS: Record<BannerTone, IconName> = {
  info: 'attention',
  success: 'check',
  warning: 'warning',
  danger: 'attention',
};

/** A full-width strip below the header about the account, the connection, the site or the page. */
@Component({
  selector: 'll-banner',
  imports: [Icon, IconButton],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Banner {
  readonly tone = input<BannerTone>('info');
  readonly live = input(false, { transform: booleanAttribute });
  readonly label = input<string | null>(null);
  readonly icon = input<IconName | null>(null);
  readonly dismissLabel = input<string | null>(null);
  readonly dismissed = output<void>();

  protected readonly iconName = computed(() => this.icon() ?? ICONS[this.tone()]);
  protected readonly role = computed(() =>
    this.live() ? 'status' : this.label() ? 'region' : null,
  );
}
