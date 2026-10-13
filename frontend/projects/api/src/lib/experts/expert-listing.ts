/** One expert in the directory. */
export interface ExpertListing {
  readonly slug: string;
  readonly name: string;
  readonly photoUrl: string | null;
  /** "Church historian". */
  readonly title: string;
  /** What they work on, in a few words: "Augustine, attention and memory". */
  readonly focus: string | null;
  readonly itemCount: number;
}
