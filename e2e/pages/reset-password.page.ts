import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class ResetPasswordPage {
  readonly shell: AppShell;
  readonly heading: Locator;
  readonly eyebrow: Locator;
  readonly sub: Locator;
  readonly loading: Locator;
  readonly password: Locator;
  readonly showPassword: Locator;
  readonly passwordError: Locator;
  readonly submit: Locator;
  readonly summary: Locator;
  readonly alert: Locator;
  readonly tryAgain: Locator;
  readonly signInButton: Locator;
  readonly sendNewLink: Locator;
  readonly alt: Locator;
  private readonly card: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.card = page.locator('.auth__card');
    this.heading = page.getByRole('heading', { level: 1 });
    this.eyebrow = this.card.locator('.eyebrow');
    this.sub = this.card.locator('.auth__sub');
    this.loading = this.card.locator('.spinner-region');
    this.password = this.card.getByLabel('New password', { exact: true });
    this.showPassword = this.card.getByRole('button', { name: 'Show' });
    this.passwordError = this.card.locator('#password-error');
    this.submit = this.card.locator('button[type="submit"]');
    this.summary = this.card.locator('.form-summary');
    this.alert = this.card.locator('.alert');
    this.tryAgain = this.card.getByRole('button', { name: 'Try again' });
    this.signInButton = this.card.getByRole('link', { name: 'Sign in', exact: true }).first();
    this.sendNewLink = this.card.getByRole('link', { name: 'Send a new link' });
    this.alt = this.card.locator('.auth__alt');
  }

  async open(token: string): Promise<void> {
    await this.page.goto(`/reset-password?token=${token}`);
    await this.heading.waitFor();
  }

  async save(password: string): Promise<void> {
    await this.password.fill(password);
    await this.submit.click();
  }
}
