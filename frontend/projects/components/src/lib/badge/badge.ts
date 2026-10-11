import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeTone } from './badge-tone';

/** A short status in words with a dot, or a count. */
@Component({
  selector: 'span[llBadge]',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'badge',
    '[class.badge--success]': "tone() === 'success'",
    '[class.badge--warning]': "tone() === 'warning'",
    '[class.badge--danger]': "tone() === 'danger'",
    '[class.badge--info]': "tone() === 'info'",
    '[class.badge--solid]': "tone() === 'solid'",
    '[class.badge--count]': "tone() === 'count'",
    '[class.badge--plain]': 'plain()',
  },
})
export class Badge {
  readonly tone = input<BadgeTone>('neutral');
  readonly plain = input(false, { transform: booleanAttribute });
}
