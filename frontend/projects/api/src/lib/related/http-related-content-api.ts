import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentSummary } from '../content/content-summary';
import { RelatedContentApi } from './related-content-api';

@Injectable()
export class HttpRelatedContentApi implements RelatedContentApi {
  private readonly http = inject(HttpClient);

  getRelated(contentId: string): Observable<readonly ContentSummary[]> {
    return this.http.get<readonly ContentSummary[]>(
      `/api/v1/content/${encodeURIComponent(contentId)}/related`,
    );
  }
}
