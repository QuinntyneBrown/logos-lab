import type { Locator, Page } from '@playwright/test';

/** The prompt an unverified member gets for an action that needs a verified email: docs/mocks/dialogs/verify-email-prompt. */
export class VerifyEmailPromptDialog {
  readonly dialog: Locator;
  readonly title: Locator;
  readonly notNow: Locator;
  readonly resend: Locator;
  readonly sending: Locator;
  readonly back: Locator;
  readonly changeAddress: Locator;
  readonly alert: Locator;
  readonly alertTitle: Locator;
  readonly close: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.dialog = page.getByRole('dialog', { name: /^(Verify your email|Check your inbox)/ });
    this.title = this.dialog.getByRole('heading', { level: 1 });
    this.notNow = this.dialog.getByRole('button', { name: 'Not now' });
    this.resend = this.dialog.getByRole('button', { name: /^Resend/ });
    this.sending = this.dialog.getByRole('button', { name: 'Sending…' });
    this.back = this.dialog.getByRole('button', { name: /^Back to / });
    this.changeAddress = this.dialog.getByRole('link', { name: 'Change it in Settings' });
    this.alert = this.dialog.locator('.alert');
    this.alertTitle = this.alert.locator('.alert__title');
    this.footer = this.dialog.locator('.dialog__footer');
    this.close = this.dialog.getByRole('button', { name: 'Close' });
  }
}
