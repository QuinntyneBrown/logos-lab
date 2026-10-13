import { Observable } from 'rxjs';
import { Collection } from './collection';
import { CollectionProgress } from './collection-progress';

/** Published collections (detailed designs collections/view-collection and follow-collection). */
export interface CollectionsApi {
  /** A collection, or a `404` error for a slug that is not a published collection. */
  getCollection(slug: string): Observable<Collection>;
  /** The signed-in member's progress through the collection's items. */
  getMyProgress(collectionId: string): Observable<CollectionProgress>;
}
