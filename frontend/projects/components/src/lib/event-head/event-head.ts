import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { Skeleton } from '../skeleton/skeleton';

/** The top of an event page: date block, title, when, where and who hosts, with room for actions. */
@Component({
  selector: 'header[llEventHead]',
  imports: [Icon, Skeleton],
  templateUrl: './event-head.html',
  styleUrl: './event-head.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'event-head',
    '[attr.aria-busy]': "loading() ? 'true' : null",
  },
})
export class EventHead {
  readonly title = input.required<string>();
  readonly day = input('');
  readonly month = input('');
  readonly datetime = input('');
  readonly when = input('');
  readonly where = input('');
  /** Shows the monitor icon before `where`; otherwise the place icon. */
  readonly online = input(false, { transform: booleanAttribute });
  readonly hosts = input('');
  /** Strikes the title through. */
  readonly cancelled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  /** While loading, the text of the visually hidden status. */
  readonly loadingLabel = input<string | null>(null);
}
