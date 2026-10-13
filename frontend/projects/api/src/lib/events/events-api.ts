import { Observable } from 'rxjs';
import { EventList } from './event-list';
import { EventListQuery } from './event-list-query';

/** The events (detailed design events/browse-events). */
export interface EventsApi {
  listEvents(query: EventListQuery): Observable<EventList>;
}
