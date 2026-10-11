import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class SignInPage {
  readonly shell: AppShell;
  readonly heading: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly showPassword: Locator;
  readonly submit: Locator;
  readonly forgotPassword: Locator;
  readonly createAccount: Locator;
  readonly alert: Locator;
  readonly summary: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const card = page.locator('.auth__card');
    this.heading = page.getByRole('heading', { level: 1 });
    this.email = card.getByLabel('Email', { exact: true });
    this.password = card.getByLabel('Password', { exact: true });
    this.showPassword = card.getByRole('button', { name: 'Show' });
    this.submit = card.locator('button[type="submit"]');
    this.forgotPassword = card.getByRole('link', { name: 'Forgot your password?' });
    this.createAccount = card.getByRole('link', { name: 'Create a free account' });
    this.alert = card.locator('.alert');
    this.summary = card.locator('.form-summary');
  }

  async open(query = ''): Promise<void> {
    await this.page.goto(`/sign-in${query}`);
    await this.heading.waitFor();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  /** Presses the submit button again from the keyboard (a busy button keeps focus). */
  async submitAgain(): Promise<void> {
    await this.submit.press('Enter');
  }

  alertTitle(): Locator {
    return this.alert.locator('.alert__title');
  }

  alertAction(name: string): Locator {
    return this.alert.getByRole('link', { name });
  }

  summaryLinks(): Locator {
    return this.summary.getByRole('link');
  }

  /** Whether a paste into the field goes through (L2-128 AC3: paste is never blocked). */
  pasteAllowed(field: Locator): Promise<boolean> {
    return field.evaluate((input) => {
      const data = new DataTransfer();
      data.setData('text/plain', 'quiet-harbour-at-dawn');
      return input.dispatchEvent(
        new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }),
      );
    });
  }

  errorFor(field: Locator): Promise<string | null> {
    return field.getAttribute('aria-describedby');
  }
}
