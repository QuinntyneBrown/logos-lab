import { FollowsApi } from '@logos-lab/api';
import { UnfollowDialogData } from './unfollow-dialog-data';

/** The unfollow dialog for an expert (docs/mocks/dialogs/unfollow). */
export function unfollowExpertData(
  api: FollowsApi,
  expertId: string,
  expertName: string,
): UnfollowDialogData {
  return {
    title: $localize`:@@unfollow.title:Unfollow ${expertName}:name:?`,
    description: $localize`:@@unfollow.description:You'll stop getting notifications when ${expertName}:name: publishes or announces an event. You can follow again at any time.`,
    failedBody: $localize`:@@unfollow.failed.body:You're still following ${expertName}:name:. Check your connection and try again.`,
    unfollow: () => api.unfollowExpert(expertId),
  };
}
