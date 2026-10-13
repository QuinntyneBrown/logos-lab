import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { Button } from '../button/button';
import { PaginationItem } from './pagination-item';
import { paginationItems } from './pagination-items';

/** Numbered pages of a long list, as links to the same route with the page in the address. */
@Component({
  selector: 'nav[llPagination]',
  imports: [RouterLink, Button],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pager',
    '[attr.aria-label]': 'label()',
    '[hidden]': 'count() < 2',
  },
})
export class Pagination {
  /** The navigation's name: "Pages of the catalogue". */
  readonly label = input.required<string>();
  /** The current page, from 1. */
  readonly page = input.required<number>();
  readonly pageCount = input.required<number>();
  /** The count text: "Page 2 of 97". */
  readonly summary = input.required<string>();
  /** A page link's name, with a `{page}` placeholder: "Page {page}". */
  readonly pageLabel = input.required<string>();
  readonly previousLabel = input.required<string>();
  readonly nextLabel = input.required<string>();
  /** The query parameter that carries the page. */
  readonly queryParam = input('page');

  protected readonly count = computed(() => {
    const count = Math.trunc(this.pageCount());
    return Number.isFinite(count) ? count : 0;
  });
  protected readonly current = computed(() =>
    Math.min(Math.max(Math.trunc(this.page()) || 1, 1), Math.max(this.count(), 1)),
  );
  protected readonly progress = computed(
    () => `${Math.round((this.current() / this.count()) * 100)}%`,
  );
  protected readonly items = computed<readonly PaginationItem[]>(() =>
    this.count() < 2 ? [] : paginationItems(this.current(), this.count()),
  );

  /** Page 1 drops the parameter, so its address is the list's own. */
  protected paramsFor(page: number): Params {
    return { [this.queryParam()]: page === 1 ? null : page };
  }

  protected nameOf(page: number): string {
    return this.pageLabel().replace('{page}', String(page));
  }
}
