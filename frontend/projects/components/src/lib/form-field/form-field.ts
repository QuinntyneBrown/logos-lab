import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { Icon } from '../icon/icon';

/** A labelled control with help, error and counter, tied together for assistive technology. */
@Component({
  selector: 'll-form-field',
  imports: [Icon],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  readonly label = input.required<string>();
  readonly controlId = input.required<string>();
  readonly optional = input<string | null>(null);
  readonly help = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly counter = input<string | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly helpId = computed(() => `${this.controlId()}-help`);
  protected readonly errorId = computed(() => `${this.controlId()}-error`);
  protected readonly counterId = computed(() => `${this.controlId()}-counter`);

  constructor() {
    // The field owns the control's descriptions and invalid state (form-field CRD D-1).
    effect(() => {
      const control = this.host.querySelector<HTMLElement>(`#${CSS.escape(this.controlId())}`);
      if (!control) return;
      const describedBy = [
        this.help() ? this.helpId() : null,
        this.error() ? this.errorId() : null,
        this.counter() ? this.counterId() : null,
      ].filter(Boolean);
      if (describedBy.length) control.setAttribute('aria-describedby', describedBy.join(' '));
      else control.removeAttribute('aria-describedby');
      if (this.error()) control.setAttribute('aria-invalid', 'true');
      else control.removeAttribute('aria-invalid');
    });
  }
}
