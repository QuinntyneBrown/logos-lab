import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { Search } from '../text-field/search';
import { ComboboxGroup } from './combobox-group';
import { ComboboxOption } from './combobox-option';
import { ComboboxStatus } from './combobox-status';

/** The site search with a list of suggestions (APG combobox with a listbox popup). */
@Component({
  selector: 'll-combobox',
  imports: [Search, Icon, RouterLink],
  templateUrl: './combobox.html',
  styleUrl: './combobox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Combobox {
  readonly label = input.required<string>();
  readonly placeholder = input('');
  readonly inputId = input.required<string>();
  readonly maxlength = input(200);
  readonly value = input('');
  readonly open = input(false, { transform: booleanAttribute });
  readonly listLabel = input('');
  readonly groups = input<readonly ComboboxGroup[]>([]);
  readonly status = input<ComboboxStatus | null>(null);
  readonly statusText = input('');
  readonly footText = input<string | null>(null);
  readonly announcement = input('');

  readonly queryChanged = output<string>();
  readonly optionChosen = output<ComboboxOption>();
  readonly searched = output<string>();
  readonly dismissed = output<void>();

  /** Escape hides the list until the person types again. */
  private readonly hidden = signal(false);
  protected readonly active = signal(-1);
  private readonly optionLinks = viewChildren<ElementRef<HTMLAnchorElement>>('optionLink');
  private readonly searchField = viewChild.required(Search);

  /** Moves focus into the query. */
  focus(): void {
    this.searchField().focus();
  }

  protected readonly listId = computed(() => `${this.inputId()}-list`);
  protected readonly statusId = computed(() => `${this.inputId()}-status`);
  protected readonly footId = computed(() => `${this.inputId()}-all`);
  protected readonly shown = computed(() => this.open() && !this.hidden());
  protected readonly options = computed(() => this.groups().flatMap((group) => group.options));
  /** Options plus the foot, in arrow-key order. */
  private readonly count = computed(() => this.options().length + (this.footText() ? 1 : 0));
  protected readonly activeId = computed(() => {
    const index = this.active();
    if (!this.shown() || index < 0) return null;
    return index < this.options().length ? this.optionId(index) : this.footId();
  });
  protected readonly describedBy = computed(() =>
    this.shown() && (this.status() === 'invalid' || this.status() === 'limit')
      ? this.statusId()
      : null,
  );

  protected optionId(index: number): string {
    return `${this.inputId()}-option-${index}`;
  }

  protected indexOf(option: ComboboxOption): number {
    return this.options().indexOf(option);
  }

  protected typed(query: string): void {
    this.hidden.set(false);
    this.active.set(-1);
    this.queryChanged.emit(query);
  }

  protected keydown(event: KeyboardEvent, query: string): void {
    const count = this.count();
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        if (!this.shown() || !count) return;
        event.preventDefault();
        this.active.update((index) =>
          event.key === 'ArrowDown' ? (index + 1) % count : (index - 1 + count) % count,
        );
        return;
      case 'Enter': {
        const index = this.active();
        if (!this.shown() || index < 0) return;
        event.preventDefault();
        if (index < this.options().length) this.optionLinks()[index]?.nativeElement.click();
        else this.search(query);
        return;
      }
      case 'Escape':
        event.preventDefault();
        if (this.shown()) {
          this.hidden.set(true);
          this.active.set(-1);
        } else {
          this.dismissed.emit();
        }
        return;
    }
  }

  protected search(query: string): void {
    const trimmed = query.trim();
    if (trimmed) this.searched.emit(trimmed);
  }

  protected choose(option: ComboboxOption): void {
    this.hidden.set(true);
    this.optionChosen.emit(option);
  }

  protected focusLeft(event: FocusEvent, container: HTMLElement): void {
    if (!container.contains(event.relatedTarget as Node | null)) this.hidden.set(true);
  }
}
