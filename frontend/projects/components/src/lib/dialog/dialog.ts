import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IconButton } from '../button/icon-button';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';
import { DialogIconTone } from './dialog-icon-tone';
import { DialogSize } from './dialog-size';

/**
 * The frame of a modal dialog opened with the CDK Dialog service: an optional icon tile, the title,
 * a close control, the body and the actions. The application's dialog component supplies the content
 * and closes its own `DialogRef` when `closeRequested` fires.
 */
@Component({
  selector: 'll-dialog',
  imports: [Icon, IconButton],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'escape($event)' },
})
export class Dialog {
  readonly heading = input.required<string>();
  /** The title's `id`: the opener passes the same one as the CDK dialog's `ariaLabelledBy`. */
  readonly headingId = input.required<string>();
  readonly size = input<DialogSize>('md');
  readonly icon = input<IconName | null>(null);
  readonly iconTone = input<DialogIconTone>('accent');
  /** The close control's name. `null` shows no control and makes the dialog non-dismissible. */
  readonly closeLabel = input.required<string | null>();
  /** True while the application's action runs: the control is off and Escape is ignored. */
  readonly closeDisabled = input(false);

  readonly closeRequested = output<void>();

  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  /** True while the body's content is taller than the body: it then takes a focus stop. */
  protected readonly scrolls = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const body = this.body().nativeElement;
      const observer = new ResizeObserver(() =>
        this.scrolls.set(body.scrollHeight > body.clientHeight),
      );
      observer.observe(body);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected escape(event: Event): void {
    const key = event as KeyboardEvent;
    if (key.defaultPrevented || key.altKey || key.ctrlKey || key.metaKey || key.shiftKey) return;
    if (!this.closeLabel() || this.closeDisabled()) return;
    this.closeRequested.emit();
  }
}
