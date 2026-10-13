/** An expert who has published in a topic, and how many items they have there. */
export interface TopicExpert {
  readonly slug: string;
  readonly name: string;
  readonly photoUrl: string | null;
  /** Their field in a few words: "Church historian". */
  readonly headline: string;
  readonly itemCount: number;
}
