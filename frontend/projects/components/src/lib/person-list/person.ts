import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skeleton } from '../skeleton/skeleton';

/** One expert in a person list. */
@Component({
  selector: 'li[llPerson]',
  imports: [RouterLink, Skeleton],
  templateUrl: './person.html',
  styleUrl: './person.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'person',
    '[class.person--plain]': 'plain()',
    '[attr.aria-hidden]': "loading() ? 'true' : null",
  },
})
export class Person {
  readonly name = input('');
  readonly path = input('');
  readonly photoUrl = input<string | null>(null);
  readonly meta = input<readonly string[]>([]);
  readonly plain = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter((part) => part && !part.endsWith('.'))
      .slice(0, 2)
      .map((part) => part[0])
      .join(''),
  );
}
