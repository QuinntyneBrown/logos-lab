import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { ButtonSize } from './button-size';
import { ButtonVariant } from './button-variant';

/** A native button or link styled as a design-system button (`.btn`). */
@Component({
  selector: 'button[llButton], a[llButton]',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btn',
    '[class.btn--primary]': "variant() === 'primary'",
    '[class.btn--quiet]': "variant() === 'quiet'",
    '[class.btn--ghost]': "variant() === 'ghost'",
    '[class.btn--text]': "variant() === 'text'",
    '[class.btn--danger]': "variant() === 'danger'",
    '[class.btn--sm]': "size() === 'sm'",
    '[class.btn--lg]': "size() === 'lg'",
    '[class.btn--block]': 'block()',
    '[attr.type]': 'type()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.aria-busy]': 'busy() || null',
    '[attr.aria-disabled]': 'busy() || paused() || null',
    '[attr.data-paused]': 'paused() && !busy() ? "" : null',
    '[attr.aria-pressed]': 'pressed() === null ? null : pressed()',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('secondary');
  readonly size = input<ButtonSize>('md');
  readonly block = input(false, { transform: booleanAttribute });
  readonly busy = input(false, { transform: booleanAttribute });
  /** Refused for now: stays focusable, keeps its look, ignores activation. The page says why. */
  readonly paused = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly pressed = input<boolean | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly isButton = this.host.tagName === 'BUTTON';
  private readonly declaredType = this.host.getAttribute('type');

  constructor() {
    // Capturing on the element itself runs before the page's own click handler, so a busy or paused
    // button never reaches it.
    const block = (event: Event): void => this.blockWhileBusy(event);
    this.host.addEventListener('click', block, { capture: true });
    inject(DestroyRef).onDestroy(() => this.host.removeEventListener('click', block, true));
  }

  protected type(): string | null {
    return this.isButton ? (this.declaredType ?? 'button') : null;
  }

  protected blockWhileBusy(event: Event): void {
    if (this.busy() || this.paused()) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
