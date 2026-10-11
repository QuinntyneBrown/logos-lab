import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { AvatarSize } from './avatar-size';

const PIXELS: Record<AvatarSize, number> = { sm: 32, default: 40, md: 48, lg: 64 };

/** A member's square photo, or their initials on a tile; always decorative. */
@Component({
  selector: 'll-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly name = input.required<string>();
  readonly photoUrl = input<string | null>(null);
  readonly size = input<AvatarSize>('default');
  readonly tone = input<'sage' | 'clay' | 'fjord' | 'oat'>('oat');
  readonly busy = input(false, { transform: booleanAttribute });

  protected readonly pixels = computed(() => PIXELS[this.size()]);
  protected readonly sizeClass = computed(() =>
    this.size() === 'default' ? '' : `avatar--${this.size()}`,
  );
  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter((part) => part && !part.endsWith('.'))
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );
}
