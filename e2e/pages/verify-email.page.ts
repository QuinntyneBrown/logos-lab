import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class VerifyEmailPage {
  readonly shell: AppShell;
  readonly heading: Locator;
  readonly eyebrow: Locator;
  readonly sub: Locator;
  readonly loading: Locator;
  readonly confirm: Locator;
  readonly alt: Locator;
  private readonly card: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.card = page.locator('.auth__card');
    this.heading = page.getByRole('heading', { level: 1 });
    this.eyebrow = this.card.locator('.eyebrow');
    this.sub = this.card.locator('.auth__sub');
    this.loading = this.card.locator('.spinner-region');
    this.confirm = this.card.getByRole('button', { name: 'Confirm my email' });
    this.alt = this.card.locator('.auth__alt');
  }

  async open(token: string): Promise<void> {
    await this.page.goto(`/verify-email?token=${token}`);
    await this.heading.waitFor();
  }
}
