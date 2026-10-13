import { Observable } from 'rxjs';
import { CataloguePage } from './catalogue-page';
import { CatalogueQuery } from './catalogue-query';

/** The catalogue (detailed design discovery/browse-catalogue). */
export interface CatalogueApi {
  browse(query: CatalogueQuery): Observable<CataloguePage>;
}
