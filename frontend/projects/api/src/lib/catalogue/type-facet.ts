import { ContentType } from '../content/content-type';

/** A content type and how many published items it has. */
export interface TypeFacet {
  readonly value: ContentType;
  readonly count: number;
}
