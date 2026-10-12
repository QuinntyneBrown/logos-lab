import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** How far something has come; indeterminate when the value is null. */
@Component({
  selector: 'll-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBar {
  readonly value = input<number | null>(null);
  readonly label = input.required<string>();
  readonly tone = input<'accent' | 'success' | 'danger'>('accent');
  readonly caption = input<string | null>(null);
  readonly valueText = input<string | null>(null);

  protected readonly clamped = computed(() => {
    const value = this.value();
    return value === null ? null : Math.min(100, Math.max(0, value));
  });
}
