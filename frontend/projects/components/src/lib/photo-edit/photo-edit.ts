import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PhotoEditTone } from './photo-edit-tone';

/** The current photo, or initials, beside the action that changes it and its rules. */
@Component({
  selector: 'll-photo-edit',
  templateUrl: './photo-edit.html',
  styleUrl: './photo-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoEdit {
  readonly name = input.required<string>();
  readonly photoUrl = input<string | null>(null);
  readonly alt = input('');
  readonly tone = input<PhotoEditTone>('sage');
  /** The id of the field label that names the group ("Photo"). */
  readonly labelledBy = input<string | null>(null);

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter((part) => part && !part.endsWith('.'))
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );
}
