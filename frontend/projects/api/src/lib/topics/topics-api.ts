import { Observable } from 'rxjs';
import { Topic } from './topic';
import { TopicContent } from './topic-content';

/** Topic pages (detailed design discovery/browse-topic). */
export interface TopicsApi {
  /** The topic, or a `404` error for a slug that does not exist. */
  getTopic(slug: string): Observable<Topic>;
  getTopicContent(slug: string, page: number): Observable<TopicContent>;
}
