/** A featured expert on the home page. */
export interface ExpertSummary {
  readonly name: string;
  readonly slug: string;
  readonly photoUrl: string | null;
  readonly expertise: string;
  readonly itemCount: number;
}
