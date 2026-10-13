import { Observable } from 'rxjs';
import { EventList } from './event-list';
import { EventListQuery } from './event-list-query';
import { EventPageModel } from './event-page-model';
import { EventViewerState } from './event-viewer-state';

/** The events (detailed design events/browse-events). */
export interface EventsApi {
  listEvents(query: EventListQuery): Observable<EventList>;
  /** A published event by its slug, or a `404` error for one that is not published. */
  getEvent(slug: string): Observable<EventPageModel>;
  /** The signed-in caller's own place in an event. */
  getMyEvent(id: string): Observable<EventViewerState>;
}
