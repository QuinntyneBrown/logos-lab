import { RsvpPanelVariant, RsvpPlaces } from '@logos-lab/components';

/** What the registration panel says for the viewer and the event. */
export interface EventPanelView {
  readonly variant: RsvpPanelVariant;
  readonly heading: string;
  readonly text: string | null;
  readonly note: string | null;
  readonly places: RsvpPlaces | null;
  /** The line under the title: where the viewer stands. */
  readonly status: { readonly tone: 'success' | 'warning'; readonly text: string } | null;
  /** A badge above the status. */
  readonly badge: string | null;
  /** A line about the panel as a whole, after its actions. */
  readonly help: string | null;
  /** Offers to sign in or create an account. */
  readonly signIn: boolean;
  /** A way on for someone the event is over for. */
  readonly link: { readonly label: string; readonly path: string } | null;
}
