import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

/** One event in an event list: date, title, when and where, and a side for its state. */
@Component({
  selector: 'li[llEventRow]',
  imports: [RouterLink, Icon],
  templateUrl: './event-row.html',
  styleUrl: './event-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'event',
    '[class.is-past]': 'past()',
    '[class.is-cancelled]': 'cancelled()',
  },
})
export class EventRow {
  readonly title = input.required<string>();
  readonly path = input.required<string>();
  readonly datetime = input.required<string>();
  readonly day = input.required<string>();
  readonly month = input.required<string>();
  readonly when = input.required<string>();
  readonly where = input<string | null>(null);
  readonly online = input(false, { transform: booleanAttribute });
  readonly headingLevel = input<2 | 3>(3);
  readonly past = input(false, { transform: booleanAttribute });
  readonly cancelled = input(false, { transform: booleanAttribute });
}
