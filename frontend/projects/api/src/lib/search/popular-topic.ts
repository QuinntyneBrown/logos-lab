/** A popular topic, offered when a search matches nothing. */
export interface PopularTopic {
  readonly name: string;
  readonly slug: string;
  readonly itemCount: number;
}
