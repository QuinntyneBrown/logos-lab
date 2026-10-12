import type { Locator, Page } from '@playwright/test';

/** The account banner below the header: verify your email, resend, dismiss. */
export class AccountBanner {
  readonly root: Locator;
  readonly text: Locator;
  readonly resend: Locator;
  readonly dismiss: Locator;

  constructor(page: Page) {
    this.root = page.locator('.banner[aria-label="Account"]');
    this.text = this.root.locator('.banner__text');
    this.resend = this.root.getByRole('button', { name: /^Resend/ });
    this.dismiss = this.root.getByRole('button', { name: /^Dismiss/ });
  }

  async resendEmail(): Promise<void> {
    await this.resend.click();
  }

  async dismissIt(): Promise<void> {
    await this.dismiss.click();
  }
}
