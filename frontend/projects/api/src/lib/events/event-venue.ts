/** The place of an in-person or hybrid event. */
export interface EventVenue {
  readonly name: string;
  readonly address: string;
  /** The town or city, for the line in the event's head. */
  readonly city: string;
}
