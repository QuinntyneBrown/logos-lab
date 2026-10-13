import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventList } from './event-list';
import { EventListQuery } from './event-list-query';
import { EventsApi } from './events-api';

@Injectable()
export class HttpEventsApi implements EventsApi {
  private readonly http = inject(HttpClient);

  listEvents(query: EventListQuery): Observable<EventList> {
    // Only what differs from the defaults is sent, so the request matches the page's address.
    const params: Record<string, string> = {};
    if (query.tab === 'past') params['tab'] = 'past';
    if (query.format) params['format'] = query.format;
    if (query.topic) params['topic'] = query.topic;
    if (query.host) params['host'] = query.host;
    if (query.cursor) params['cursor'] = query.cursor;
    return this.http.get<EventList>('/api/v1/events', { params });
  }
}
