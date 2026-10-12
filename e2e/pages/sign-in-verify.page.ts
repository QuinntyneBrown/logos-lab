import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class SignInVerifyPage {
  readonly shell: AppShell;
  readonly heading: Locator;
  readonly eyebrow: Locator;
  readonly sub: Locator;
  readonly code: Locator;
  readonly codeError: Locator;
  readonly recoveryCode: Locator;
  readonly recoveryError: Locator;
  readonly submit: Locator;
  readonly summary: Locator;
  readonly alert: Locator;
  readonly useRecoveryCode: Locator;
  readonly useApp: Locator;
  readonly differentAccount: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const card = page.locator('.auth__card');
    this.heading = page.getByRole('heading', { level: 1 });
    this.eyebrow = card.locator('.eyebrow');
    this.sub = card.locator('.auth__sub');
    this.code = card.getByLabel('6-digit code', { exact: true });
    this.codeError = card.locator('#code-error');
    this.recoveryCode = card.getByLabel('Recovery code', { exact: true });
    this.recoveryError = card.locator('#recovery-error');
    this.submit = card.locator('button[type="submit"]');
    this.summary = card.locator('.form-summary');
    this.alert = card.locator('.alert');
    this.useRecoveryCode = card.getByRole('link', { name: 'Lost your phone? Use a recovery code' });
    this.useApp = card.getByRole('link', { name: 'Use your authenticator app instead' });
    this.differentAccount = card.getByRole('link', { name: 'Sign in with a different account' });
  }

  async open(query = ''): Promise<void> {
    await this.page.goto(`/sign-in/verify${query}`);
    await this.heading.waitFor();
  }

  async verify(code: string): Promise<void> {
    await this.code.fill(code);
    await this.submit.click();
  }

  async verifyRecoveryCode(code: string): Promise<void> {
    await this.recoveryCode.fill(code);
    await this.submit.click();
  }
}
