/** What the page has to say about the member's last press of the save button. */
export type SaveStatus =
  | { readonly kind: 'none' }
  | { readonly kind: 'saved' }
  | { readonly kind: 'removed' }
  | { readonly kind: 'failed' }
  /** Saved holds no more: `title` is what could not be saved. */
  | { readonly kind: 'full'; readonly title: string };
