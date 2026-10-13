import { MyCourseState } from '@logos-lab/api';

/** What the page knows of the member's own state: nothing yet or for a visitor, it, or that it failed. */
export type MyStateStatus =
  | { readonly kind: 'none' }
  | { readonly kind: 'loaded'; readonly state: MyCourseState }
  | { readonly kind: 'failed' };
