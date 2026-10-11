import { SectionStatus } from './section-status';

/** One home section; each carries its own status so one failure does not fail the page. */
export interface Section<T> {
  readonly status: SectionStatus;
  readonly items: readonly T[];
}
