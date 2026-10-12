import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { FieldHelp } from './field-help';

/** A labelled control with help, error and counter, tied together for assistive technology. */
@Component({
  selector: 'll-form-field',
  imports: [Icon, NgTemplateOutlet],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  readonly label = input<string | null>(null);
  /** `span` names a group of controls through `aria-labelledby` (form-field CRD D-6). */
  readonly labelAs = input<'label' | 'span'>('label');
  readonly controlId = input.required<string>();
  readonly optional = input<string | null>(null);
  readonly help = input<string | null>(null);
  readonly helpPlacement = input<'before' | 'after'>('after');
  readonly error = input<string | null>(null);
  readonly counter = input<string | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  private readonly richHelp = contentChild(FieldHelp);
  protected readonly hasHelp = computed(() => !!this.help() || !!this.richHelp());
  protected readonly labelId = computed(() => `${this.controlId()}-label`);
  protected readonly helpId = computed(() => `${this.controlId()}-help`);
  protected readonly errorId = computed(() => `${this.controlId()}-error`);
  protected readonly counterId = computed(() => `${this.controlId()}-counter`);

  constructor() {
    // The field owns the control's descriptions and invalid state (form-field CRD D-1).
    effect(() => {
      const control = this.host.querySelector<HTMLElement>(`#${CSS.escape(this.controlId())}`);
      if (!control) return;
      // Keep ids the consumer set, such as a checkbox row's description (form-field CRD D-1).
      const own = [this.helpId(), this.errorId(), this.counterId()];
      const theirs = (control.getAttribute('aria-describedby') ?? '')
        .split(/\s+/)
        .filter((id) => id && !own.includes(id));
      const describedBy = [
        ...theirs,
        this.hasHelp() ? this.helpId() : null,
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
