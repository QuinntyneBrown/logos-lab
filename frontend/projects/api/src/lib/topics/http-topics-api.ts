import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from './topic';
import { TopicContent } from './topic-content';
import { TopicsApi } from './topics-api';

@Injectable()
export class HttpTopicsApi implements TopicsApi {
  private readonly http = inject(HttpClient);

  getTopic(slug: string): Observable<Topic> {
    return this.http.get<Topic>(`/api/v1/topics/${encodeURIComponent(slug)}`);
  }

  getTopicContent(slug: string, page: number): Observable<TopicContent> {
    const params: Record<string, string> = page > 1 ? { page: String(page) } : {};
    return this.http.get<TopicContent>(`/api/v1/topics/${encodeURIComponent(slug)}/content`, {
      params,
    });
  }
}
