/** One level of a breadcrumb trail; the current page has no path. */
export interface BreadcrumbItem {
  readonly label: string;
  /** An application URL, with an optional query string; null for the current page. */
  readonly path: string | null;
}
