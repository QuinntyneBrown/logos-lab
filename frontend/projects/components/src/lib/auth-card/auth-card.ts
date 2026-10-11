import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';

/** Centres one focused task: sign in, register, reset, verify. */
@Component({
  selector: 'll-auth-card',
  imports: [Icon],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCard {
  readonly icon = input<IconName | null>(null);
}
