import { FollowsApi } from '@logos-lab/api';
import { UnfollowDialogData } from './unfollow-dialog-data';

/** The unfollow dialog for a collection. */
export function unfollowCollectionData(
  api: FollowsApi,
  collectionId: string,
  title: string,
): UnfollowDialogData {
  return {
    title: $localize`:@@unfollowCollection.title:Unfollow ${title}:title:?`,
    description: $localize`:@@unfollowCollection.description:You'll stop getting notifications when items are added to ${title}:title:. You can follow again at any time.`,
    failedBody: $localize`:@@unfollowCollection.failed.body:You're still following ${title}:title:. Check your connection and try again.`,
    unfollow: () => api.unfollowCollection(collectionId),
  };
}
