/** Who wrote an article: an expert with a profile, or Logos Lab itself. */
export interface ArticleContributor {
  readonly name: string;
  /** The expert's profile slug; `null` for Logos Lab. */
  readonly slug: string | null;
  readonly photoUrl: string | null;
  readonly isLogosLab?: boolean;
}
