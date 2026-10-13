/** Why and when an event was cancelled. */
export interface EventCancellation {
  /** The day it was cancelled, `YYYY-MM-DD`. */
  readonly cancelledOn: string;
  readonly reason: string;
}
