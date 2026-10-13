import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { FollowResult } from '@logos-lab/api';
import { modalConfig } from './modal-config';
import { UnfollowDialogData } from './unfollow/unfollow-dialog-data';

/** Opens the dialogs of the follow feature; their code loads when the first one is needed. */
@Injectable({ providedIn: 'root' })
export class FollowDialogs {
  private readonly dialog = inject(Dialog);

  /** Resolves with the new follower count once the unfollow went through, else `undefined`. */
  async confirmUnfollow(data: UnfollowDialogData): Promise<FollowResult | undefined> {
    const { UnfollowDialog } = await import('./unfollow/unfollow-dialog');
    const ref = this.dialog.open<FollowResult, UnfollowDialogData>(
      UnfollowDialog,
      modalConfig<UnfollowDialogData, FollowResult>(data, 'unfollow-title', 'unfollow-desc'),
    );
    return new Promise((resolve) => ref.closed.subscribe((result) => resolve(result)));
  }
}
