import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, Dialog } from '@logos-lab/components';
import { SignInRequiredDialogData } from './sign-in-required-dialog-data';

/** Sends a visitor to sign in or register and back (docs/mocks/dialogs/sign-in-required). */
@Component({
  selector: 'll-sign-in-required-dialog',
  imports: [Button, Dialog, RouterLink],
  templateUrl: './sign-in-required-dialog.html',
  styleUrl: './sign-in-required-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInRequiredDialog {
  protected readonly data = inject<SignInRequiredDialogData>(DIALOG_DATA);
  private readonly ref = inject(DialogRef);

  protected readonly returnQuery = { returnUrl: this.data.returnUrl };

  protected close(): void {
    this.ref.close();
  }
}
