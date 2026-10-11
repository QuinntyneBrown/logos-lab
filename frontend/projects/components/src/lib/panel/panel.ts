import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A warm grain panel holding a page's one invitation. */
@Component({
  selector: 'll-panel',
  templateUrl: './panel.html',
  styleUrl: './panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Panel {
  readonly compact = input(false, { transform: booleanAttribute });
  readonly grain = input(true, { transform: booleanAttribute });
}
