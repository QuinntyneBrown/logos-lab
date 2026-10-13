import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FollowResult } from '@logos-lab/api';
import { Alert, Button, Dialog } from '@logos-lab/components';
import { UnfollowDialogData } from './unfollow-dialog-data';

/** Asks before a follow is removed, and removes it (docs/mocks/dialogs/unfollow). */
@Component({
  selector: 'll-unfollow-dialog',
  imports: [Alert, Button, Dialog],
  templateUrl: './unfollow-dialog.html',
  styleUrl: './unfollow-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnfollowDialog {
  protected readonly data = inject<UnfollowDialogData>(DIALOG_DATA);
  private readonly ref = inject<DialogRef<FollowResult>>(DialogRef);

  protected readonly busy = signal(false);
  protected readonly failed = signal(false);

  protected unfollow(): void {
    if (this.busy()) return;
    this.busy.set(true);
    this.failed.set(false);
    this.data.unfollow().subscribe({
      next: (result) => this.ref.close(result),
      error: () => {
        this.busy.set(false);
        this.failed.set(true);
      },
    });
  }

  /** "Keep following", the close control or Escape; none of them works while the request runs. */
  protected keep(): void {
    if (!this.busy()) this.ref.close();
  }
}
