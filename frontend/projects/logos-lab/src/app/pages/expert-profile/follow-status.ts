/** What the page has to say about the member's last press of the follow button. */
export type FollowStatus =
  | { readonly kind: 'none' }
  | { readonly kind: 'followed' }
  | { readonly kind: 'unfollowed' }
  | { readonly kind: 'failed' }
  | { readonly kind: 'paused'; readonly until: Date };
