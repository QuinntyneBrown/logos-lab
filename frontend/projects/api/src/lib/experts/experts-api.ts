import { Observable } from 'rxjs';
import { ContentType } from '../content/content-type';
import { ExpertContent } from './expert-content';
import { ExpertDirectory } from './expert-directory';
import { ExpertProfile } from './expert-profile';
import { ExpertsQuery } from './experts-query';

/** The experts (detailed designs experts/browse-experts and the profile features). */
export interface ExpertsApi {
  listExperts(query: ExpertsQuery): Observable<ExpertDirectory>;
  /** An expert's profile, or a `404` error for a slug that is not a current expert. */
  getProfile(slug: string): Observable<ExpertProfile>;
  /** One page of an expert's published items of one type. */
  getContent(slug: string, type: ContentType, page: number): Observable<ExpertContent>;
}
