import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** An ordered list of timed entries on a vertical rule: an agenda, a history. */
@Component({
  selector: 'ol[llTimeline]',
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'timeline',
    role: 'list',
    '[attr.aria-label]': 'label()',
    '[attr.aria-busy]': "busy() ? 'true' : null",
  },
})
export class Timeline {
  /** Names a list no visible heading names. */
  readonly label = input<string | null>(null);
  readonly busy = input(false, { transform: booleanAttribute });
}
