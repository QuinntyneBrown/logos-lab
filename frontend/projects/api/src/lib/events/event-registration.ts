/** A signed-in caller's place in an event: registered, or waiting for a place to open. */
export interface EventRegistration {
  readonly status: 'registered' | 'waitlisted';
  /** The caller's number on the waitlist; `null` once registered. */
  readonly waitlistPosition: number | null;
}
