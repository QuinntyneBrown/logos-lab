import { ContentType } from '../content/content-type';
import { SearchContentHit } from './search-content-hit';

/** The hits of one content type; `count` may be more than the hits sent. */
export interface SearchContentGroup {
  readonly type: ContentType;
  readonly count: number;
  readonly hits: readonly SearchContentHit[];
}
