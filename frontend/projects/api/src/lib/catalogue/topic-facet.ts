/** A topic and how many published items it has. */
export interface TopicFacet {
  readonly value: string;
  readonly label: string;
  readonly count: number;
}
