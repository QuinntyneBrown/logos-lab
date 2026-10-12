import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class ForgotPasswordPage {
  readonly shell: AppShell;
  readonly heading: Locator;
  readonly eyebrow: Locator;
  readonly sub: Locator;
  readonly email: Locator;
  readonly emailHelp: Locator;
  readonly emailError: Locator;
  readonly submit: Locator;
  readonly summary: Locator;
  readonly alert: Locator;
  readonly notes: Locator;
  readonly differentEmail: Locator;
  readonly backToSignIn: Locator;
  readonly signIn: Locator;
  private readonly card: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.card = page.locator('.auth__card');
    this.heading = page.getByRole('heading', { level: 1 });
    this.eyebrow = this.card.locator('.eyebrow');
    this.sub = this.card.locator('.auth__sub');
    this.email = this.card.getByLabel('Email', { exact: true });
    this.emailHelp = this.card.locator('#email-help');
    this.emailError = this.card.locator('#email-error');
    this.submit = this.card.locator('button[type="submit"]');
    this.summary = this.card.locator('.form-summary');
    this.alert = this.card.locator('.alert');
    this.notes = this.card.locator('.prose li');
    this.differentEmail = this.card.getByRole('button', { name: 'Use a different email' });
    this.backToSignIn = this.card.getByRole('link', { name: 'Back to sign in' });
    this.signIn = this.card.locator('.auth__alt').getByRole('link', { name: 'Sign in' });
  }

  async open(): Promise<void> {
    await this.page.goto('/forgot-password');
    await this.heading.waitFor();
  }

  async requestLink(email: string): Promise<void> {
    await this.email.fill(email);
    await this.submit.click();
  }
}
