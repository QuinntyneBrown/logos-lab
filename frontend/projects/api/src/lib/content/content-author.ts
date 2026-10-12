/** Who an item is by: an expert, or Logos Lab itself. */
export interface ContentAuthor {
  readonly name: string;
  readonly slug: string | null;
  readonly photoUrl: string | null;
  readonly isLogosLab?: boolean;
}
