import { FollowResult } from '@logos-lab/api';
import { Observable } from 'rxjs';

/** What the unfollow dialog says and does: experts and collections share it. */
export interface UnfollowDialogData {
  /** "Unfollow Dr. Abena Mensah?". */
  readonly title: string;
  readonly description: string;
  /** Said under the failure alert's title. */
  readonly failedBody: string;
  /** Removes the follow; the dialog closes with the follower count it answers with. */
  readonly unfollow: () => Observable<FollowResult>;
}
