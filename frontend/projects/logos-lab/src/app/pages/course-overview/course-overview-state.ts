import { CourseOverview } from '@logos-lab/api';

/** What the course page is showing for the course's address. */
export type CourseOverviewState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'loaded'; readonly course: CourseOverview }
  | { readonly kind: 'not-found' }
  | { readonly kind: 'failed' };
