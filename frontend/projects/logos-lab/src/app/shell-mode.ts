/**
 * How the shell frames a page: the product shell, or a focused shell (minimal top bar with one
 * action and a quiet footer) for sign-in, registration and account flows.
 */
export type ShellMode =
  | { readonly kind: 'product' }
  | { readonly kind: 'focused'; readonly action: 'register' | 'sign-in' };
