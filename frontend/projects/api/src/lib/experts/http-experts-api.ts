import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpertDirectory } from './expert-directory';
import { ExpertsApi } from './experts-api';
import { ExpertsQuery } from './experts-query';

@Injectable()
export class HttpExpertsApi implements ExpertsApi {
  private readonly http = inject(HttpClient);

  listExperts(query: ExpertsQuery): Observable<ExpertDirectory> {
    // Only what differs from the defaults is sent, so the request matches the page's address.
    const params: Record<string, string> = {};
    if (query.q) params['q'] = query.q;
    if (query.topic) params['topic'] = query.topic;
    if (query.page > 1) params['page'] = String(query.page);
    return this.http.get<ExpertDirectory>('/api/v1/experts', { params });
  }
}
