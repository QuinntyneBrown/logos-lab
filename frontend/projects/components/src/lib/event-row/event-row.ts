import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { Skeleton } from '../skeleton/skeleton';

/** One event in an event list: date, title, when and where, and a side for its state. */
@Component({
  selector: 'li[llEventRow]',
  imports: [RouterLink, Icon, Skeleton],
  templateUrl: './event-row.html',
  styleUrl: './event-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'event',
    '[class.is-past]': 'past()',
    '[class.is-cancelled]': 'cancelled()',
    '[attr.aria-hidden]': "loading() ? 'true' : null",
  },
})
export class EventRow {
  readonly title = input('');
  readonly path = input('');
  readonly datetime = input('');
  readonly day = input('');
  readonly month = input('');
  readonly when = input('');
  readonly where = input<string | null>(null);
  readonly online = input(false, { transform: booleanAttribute });
  readonly headingLevel = input<2 | 3>(3);
  readonly past = input(false, { transform: booleanAttribute });
  readonly cancelled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
}
