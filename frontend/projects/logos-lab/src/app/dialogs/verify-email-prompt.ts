import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { modalConfig } from './modal-config';
import { VerifyEmailPromptData } from './verify-email-prompt/verify-email-prompt-data';

/** Asks an unverified member to verify their email before an action that needs it (L2-007). */
@Injectable({ providedIn: 'root' })
export class VerifyEmailPrompt {
  private readonly dialog = inject(Dialog);

  /** Resolves when the member dismisses the prompt. */
  async ask(data: VerifyEmailPromptData): Promise<void> {
    const { VerifyEmailPromptDialog } =
      await import('./verify-email-prompt/verify-email-prompt-dialog');
    const ref = this.dialog.open<void, VerifyEmailPromptData>(
      VerifyEmailPromptDialog,
      modalConfig<VerifyEmailPromptData, void>(data, 'verify-title', 'verify-desc'),
    );
    return new Promise((resolve) => ref.closed.subscribe(() => resolve()));
  }
}
