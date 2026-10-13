import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { SelectSize } from './select-size';

/** A native select styled as a pill, with its label beside it and a chevron. */
@Component({
  selector: 'll-select',
  imports: [NgTemplateOutlet, Icon],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  /** The visible label of an inline select; without one the select is named by a form field. */
  readonly label = input<string | null>(null);
  readonly size = input<SelectSize>('md');
  /** The chosen option's value. Emits `valueChange` only when the member commits a choice. */
  readonly value = model('');
  readonly controlId = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly describedBy = input<string | null>(null);

  private readonly control = viewChild<ElementRef<HTMLSelectElement>>('control');

  constructor() {
    // The native control shows `value`; a value no option has leaves the first option showing.
    afterRenderEffect((onCleanup) => {
      const element = this.control()?.nativeElement;
      const value = this.value();
      if (!element) return;
      const show = () => {
        element.value = value;
        if (element.value !== value) element.selectedIndex = 0;
      };
      show();
      // Options that arrive after the value was set re-apply it (select CRD AC-17).
      const observer = new MutationObserver(show);
      observer.observe(element, { childList: true, subtree: true });
      onCleanup(() => observer.disconnect());
    });
  }

  protected choose(): void {
    const element = this.control()?.nativeElement;
    if (element) this.value.set(element.value);
  }
}
