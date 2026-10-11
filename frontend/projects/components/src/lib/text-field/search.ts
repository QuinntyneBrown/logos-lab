import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

/** The search pill: magnifier, hidden label, query and an optional projected action. */
@Component({
  selector: 'form[llSearch], div[llSearch]',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'search',
    '[attr.role]': "isForm ? 'search' : null",
    '(submit)': 'submit($event)',
  },
})
export class Search {
  readonly label = input.required<string>();
  readonly placeholder = input('');
  readonly inputId = input.required<string>();
  readonly name = input('q');
  readonly value = input('');
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly describedBy = input<string | null>(null);
  readonly maxlength = input<number | null>(null);
  readonly listboxId = input<string | null>(null);
  readonly expanded = input(false, { transform: booleanAttribute });
  readonly activeDescendant = input<string | null>(null);

  readonly searched = output<string>();
  readonly queryChanged = output<string>();
  readonly queryKeydown = output<KeyboardEvent>();

  protected readonly isForm =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'FORM';
  private readonly query = viewChild.required<ElementRef<HTMLInputElement>>('query');

  /** Moves focus into the query. */
  focus(): void {
    this.query().nativeElement.focus();
  }

  /** The query as typed. */
  text(): string {
    return this.query().nativeElement.value;
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const text = this.query().nativeElement.value.trim();
    if (text) this.searched.emit(text);
  }
}
