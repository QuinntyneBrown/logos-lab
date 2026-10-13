import { Observable } from 'rxjs';
import { ContentType } from '../content/content-type';

/** What a member keeps for later (detailed design learner-dashboard/save-items). */
export interface SavedItemsApi {
  /** Saves an item. Idempotent. A `409` problem `saved-limit-reached` means Saved is full. */
  save(type: ContentType, itemId: string): Observable<void>;
  /** Removes an item from Saved. */
  unsave(type: ContentType, itemId: string): Observable<void>;
}
