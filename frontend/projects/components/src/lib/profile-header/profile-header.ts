import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { Skeleton } from '../skeleton/skeleton';
import { ProfileMeta } from './profile-meta';

const TONES = ['sage', 'clay', 'fjord', 'oat'] as const;

/** Who a person or an expert is: photo, name, line, facts and the actions that apply. */
@Component({
  selector: 'll-profile-header',
  imports: [Icon, Skeleton],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeader {
  /** The page's heading, the photo's alternative text and the source of the initials. */
  readonly name = input.required<string>();
  readonly photoUrl = input<string | null>(null);
  readonly sub = input<string | null>(null);
  readonly meta = input<readonly ProfileMeta[]>([]);
  /** Shows the skeleton form while the profile loads; `name` is then only the heading's text. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** The one status message a loading header announces. */
  readonly busyMessage = input<string | null>(null);

  /** True after the photo failed to load: the initials tile takes its place. */
  protected readonly photoFailed = signal(false);

  /** "Dr. Mei Lin Chen" gives "MC": the first and last words that do not end in a full stop. */
  protected readonly initials = computed(() => {
    const words = this.name()
      .split(/\s+/)
      .filter((word) => word && !word.endsWith('.'));
    if (words.length === 0) return '';
    const first = words[0][0];
    return (words.length > 1 ? first + words[words.length - 1][0] : first).toUpperCase();
  });

  /** A stable tone from the name, so the same person always has the same tile. */
  protected readonly tone = computed(() => {
    let hash = 0;
    for (const char of this.name()) hash = (hash * 31 + char.charCodeAt(0)) % 997;
    return TONES[hash % TONES.length];
  });
}
