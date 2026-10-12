/** The by-line of a content card. */
export interface ContentCardAuthor {
  readonly name: string;
  readonly photoUrl?: string | null;
  /** Shows the Logos Lab mark instead of a photo. */
  readonly logosLab?: boolean;
}
