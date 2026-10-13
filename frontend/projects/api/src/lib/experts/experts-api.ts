import { Observable } from 'rxjs';
import { ExpertDirectory } from './expert-directory';
import { ExpertsQuery } from './experts-query';

/** The experts (detailed designs experts/browse-experts and the profile features). */
export interface ExpertsApi {
  listExperts(query: ExpertsQuery): Observable<ExpertDirectory>;
}
