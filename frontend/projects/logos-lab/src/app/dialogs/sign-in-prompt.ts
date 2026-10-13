import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { modalConfig } from './modal-config';
import { SignInRequiredDialogData } from './sign-in-required/sign-in-required-dialog-data';

/** Asks a visitor to sign in or register for an action that needs an account (L2-015). */
@Injectable({ providedIn: 'root' })
export class SignInPrompt {
  private readonly dialog = inject(Dialog);

  /** Resolves when the visitor dismisses the prompt. */
  async ask(data: SignInRequiredDialogData): Promise<void> {
    const { SignInRequiredDialog } = await import('./sign-in-required/sign-in-required-dialog');
    const ref = this.dialog.open<void, SignInRequiredDialogData>(
      SignInRequiredDialog,
      modalConfig<SignInRequiredDialogData, void>(data, 'sign-in-title', 'sign-in-desc'),
    );
    return new Promise((resolve) => ref.closed.subscribe(() => resolve()));
  }
}
