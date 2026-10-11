/** Why the API refused a registration, as the page explains it (L2-006). */
export type RegisterFailure =
  { readonly kind: 'paused'; readonly until: Date } | { readonly kind: 'unavailable' };
