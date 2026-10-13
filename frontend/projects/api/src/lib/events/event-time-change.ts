/** A moved time: what it was before. */
export interface EventTimeChange {
  readonly previousStartsAt: string;
  readonly previousEndsAt: string;
  /** What the hosts say about the move; `null` when they said nothing. */
  readonly note: string | null;
}
