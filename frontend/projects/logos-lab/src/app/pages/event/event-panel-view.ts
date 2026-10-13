import { RsvpPlaces } from '@logos-lab/components';

/** What the registration panel says for the viewer and the event. */
export interface EventPanelView {
  readonly heading: string;
  readonly text: string | null;
  readonly note: string | null;
  readonly places: RsvpPlaces | null;
  /** A warning line under the title. */
  readonly status: string | null;
  /** A line about the panel as a whole, after its actions. */
  readonly help: string | null;
  /** Offers to sign in or create an account. */
  readonly signIn: boolean;
}
