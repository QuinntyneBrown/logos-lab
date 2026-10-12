/** A run of text; highlighted runs are the part that matched the query. */
export interface TextSegment {
  readonly text: string;
  readonly highlighted: boolean;
}
