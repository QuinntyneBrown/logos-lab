/** Someone who hosts an event; Logos Lab itself has no profile. */
export interface EventHost {
  readonly name: string;
  /** The expert's profile slug; `null` when the host has no profile. */
  readonly slug: string | null;
  /** The line under the name: their title, or who organised the event. */
  readonly meta: string | null;
  readonly photoUrl: string | null;
}
