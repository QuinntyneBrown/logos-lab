import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconButton } from '../button/icon-button';
import { DrawerSide } from './drawer-side';

/** The frame of a sheet dialog opened with the CDK Dialog service. */
@Component({
  selector: 'll-drawer',
  imports: [IconButton],
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {
  readonly side = input<DrawerSide>('left');
  readonly heading = input.required<string>();
  readonly headingId = input.required<string>();
  readonly closeLabel = input.required<string>();

  readonly closeRequested = output<void>();
}
