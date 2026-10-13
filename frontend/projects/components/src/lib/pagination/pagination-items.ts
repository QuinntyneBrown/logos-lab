import { PaginationItem } from './pagination-item';

/**
 * The numbers the pager shows: the first page, three consecutive pages around the current one, and
 * the last page. One missing page is shown instead of a gap; more than one becomes a gap.
 */
export function paginationItems(current: number, count: number): PaginationItem[] {
  const start = Math.min(Math.max(current - 1, 1), Math.max(1, count - 2));
  const end = Math.min(count, start + 2);
  const shown = new Set<number>([1, count]);
  for (let page = start; page <= end; page++) shown.add(page);
  const pages = [...shown].sort((a, b) => a - b);
  const items: PaginationItem[] = [];
  pages.forEach((page, index) => {
    const before = pages[index - 1];
    if (before !== undefined) {
      if (page - before === 2) items.push({ kind: 'page', page: before + 1 });
      else if (page - before > 2) items.push({ kind: 'gap' });
    }
    items.push({ kind: 'page', page });
  });
  return items;
}
