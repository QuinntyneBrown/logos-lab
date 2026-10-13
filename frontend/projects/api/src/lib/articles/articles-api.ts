import { Observable } from 'rxjs';
import { Article } from './article';

/** Published articles (detailed design articles/read-article). */
export interface ArticlesApi {
  /** An article, or a `404` error for a slug that is not a published article. */
  getArticle(slug: string): Observable<Article>;
}
