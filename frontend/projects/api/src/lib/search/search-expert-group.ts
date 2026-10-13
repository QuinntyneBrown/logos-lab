import { SearchExpertHit } from './search-expert-hit';

/** The matching experts; `count` may be more than the experts sent. */
export interface SearchExpertGroup {
  readonly type: 'expert';
  readonly count: number;
  readonly experts: readonly SearchExpertHit[];
}
