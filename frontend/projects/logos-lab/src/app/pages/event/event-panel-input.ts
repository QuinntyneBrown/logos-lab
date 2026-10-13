import { EventPageModel } from '@logos-lab/api';
import { EventViewer } from './event-viewer';

/** What decides the panel: the event, who is looking, and the moment. */
export interface EventPanelInput {
  readonly event: EventPageModel;
  readonly viewer: EventViewer;
  /** The member's number on the waitlist, when they are on it. */
  readonly waitlistPosition: number | null;
  readonly now: Date;
  readonly locale: string;
  /** The zone the page shows times in; the viewer's own when undefined. */
  readonly timeZone: string | undefined;
}
