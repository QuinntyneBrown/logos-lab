import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

/** The first focusable element on every page; moves focus to the main content. */
@Component({
  selector: 'll-skip-link',
  templateUrl: './skip-link.html',
  styleUrl: './skip-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLink {
  readonly target = input('main');

  private readonly document = inject(DOCUMENT);

  protected skip(event: Event): void {
    const target = this.document.getElementById(this.target());
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.scrollIntoView();
  }
}
