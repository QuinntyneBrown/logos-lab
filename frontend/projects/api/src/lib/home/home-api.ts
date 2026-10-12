import { Observable } from 'rxjs';
import { HomePageView } from './home-page-view';

/** The home page's data (detailed design: discovery/home-page). */
export interface HomeApi {
  getHome(): Observable<HomePageView>;
}
