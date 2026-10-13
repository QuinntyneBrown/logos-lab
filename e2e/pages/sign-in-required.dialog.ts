import type { Locator, Page } from '@playwright/test';

/** The prompt a visitor gets for an action that needs an account: docs/mocks/dialogs/sign-in-required. */
export class SignInRequiredDialog {
  readonly dialog: Locator;
  readonly title: Locator;
  readonly createAccount: Locator;
  readonly signIn: Locator;
  readonly close: Locator;

  constructor(page: Page) {
    this.dialog = page.getByRole('dialog', { name: /^Sign in to / });
    this.title = this.dialog.getByRole('heading', { level: 1 });
    this.createAccount = this.dialog.getByRole('link', { name: 'Create account' });
    this.signIn = this.dialog.getByRole('link', { name: 'Sign in' });
    this.close = this.dialog.getByRole('button', { name: 'Close' });
  }
}
