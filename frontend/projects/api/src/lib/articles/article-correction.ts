/** A correction an editor published on an article. */
export interface ArticleCorrection {
  /** The day it was published, as `YYYY-MM-DD`. */
  readonly date: string;
  readonly note: string;
}
