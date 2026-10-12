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
  readonly dashboard: Locator;
  readonly startHere: Locator;
  readonly sendNewLink: Locator;
  readonly signIn: Locator;
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
    this.dashboard = this.card.getByRole('link', { name: 'Go to your dashboard' });
    this.sendNewLink = this.card.getByRole('button', { name: 'Send a new link' });
    this.signIn = this.alt.getByRole('link', { name: 'Sign in' });
    this.startHere = this.alt.getByRole('link', { name: 'Start Here: Faith and AI' });
  }

  async open(token: string): Promise<void> {
    await this.page.goto(`/verify-email?token=${token}`);
    await this.heading.waitFor();
  }

  async confirmEmail(): Promise<void> {
    await this.confirm.click();
  }
}
