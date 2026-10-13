import { ChangeDetectionStrategy, Component } from '@angular/core';

/** The controls on a toolbar's row: the Filters button and the sort select. */
@Component({
  selector: 'div[llToolbarTools]',
  templateUrl: './toolbar-tools.html',
  styleUrl: './toolbar-tools.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'toolbar__tools' },
})
export class ToolbarTools {}
