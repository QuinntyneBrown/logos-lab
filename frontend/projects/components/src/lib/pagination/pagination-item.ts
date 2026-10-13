/** One entry of the pager's row of numbers: a page, or a gap that stands for several. */
export type PaginationItem =
  { readonly kind: 'page'; readonly page: number } | { readonly kind: 'gap' };
