/** Why the API refused a sign-in, as the page explains it (L2-008, L2-009, L2-019). */
export type SignInFailure =
  | { readonly kind: 'invalid-credentials' }
  | { readonly kind: 'paused'; readonly minutes: number; readonly until: Date }
  | { readonly kind: 'suspended'; readonly until: Date }
  | { readonly kind: 'deactivated'; readonly requestedAt: Date; readonly purgeAt: Date };
