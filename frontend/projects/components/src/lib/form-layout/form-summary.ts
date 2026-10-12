import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Icon } from '../icon/icon';
import { FormError } from './form-error';

let nextId = 0;

/** The error summary at the top of an invalid form; it takes focus when it appears (L2-128). */
@Component({
  selector: 'll-form-summary',
  imports: [Icon],
  templateUrl: './form-summary.html',
  styleUrl: './form-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSummary {
  readonly heading = input.required<string>();
  readonly errors = input.required<readonly FormError[]>();

  protected readonly titleId = `ll-form-summary-${nextId++}`;
  private readonly document = inject(DOCUMENT);
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  constructor() {
    afterNextRender(() => this.focus());
  }

  /** Moves focus to the summary, for example after another invalid submit. */
  focus(): void {
    this.panel().nativeElement.focus();
  }

  protected follow(event: Event, controlId: string): void {
    event.preventDefault();
    this.document.getElementById(controlId)?.focus();
  }
}
