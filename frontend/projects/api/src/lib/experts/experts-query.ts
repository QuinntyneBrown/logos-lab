/** What to list: a name search, a topic and a page (from 1). */
export interface ExpertsQuery {
  /** The trimmed name search; empty for none. */
  readonly q: string;
  /** A topic slug, or null for any topic. */
  readonly topic: string | null;
  readonly page: number;
}
