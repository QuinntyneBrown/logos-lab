import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';

/** The count line of a toolbar, announced politely when it changes. */
@Component({
  selector: 'p[llToolbarCount]',
  templateUrl: './toolbar-count.html',
  styleUrl: './toolbar-count.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'toolbar__count',
    'aria-live': 'polite',
    tabindex: '-1',
  },
})
export class ToolbarCount {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** Moves focus to the line, for example after the last active filter was removed. */
  focus(): void {
    this.host.focus();
  }
}
