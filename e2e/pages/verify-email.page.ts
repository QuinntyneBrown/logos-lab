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
  readonly alert: Locator;
  readonly resend: Locator;
  readonly resendHelp: Locator;
  readonly createAgain: Locator;
  readonly tryAgain: Locator;
  readonly helpLink: Locator;
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
    this.alert = this.card.locator('.alert');
    this.resend = this.card.getByRole('button', { name: /^Resend/ });
    this.resendHelp = this.card.locator('.field__help');
    this.tryAgain = this.card.getByRole('button', { name: 'Try again' });
    this.helpLink = this.alert.getByRole('link', { name: 'Write to help@logoslab.ca' });
    this.createAgain = this.alt.getByRole('link', { name: 'Create the account again' });
    this.signIn = this.alt.getByRole('link', { name: 'Sign in' });
    this.startHere = this.alt.getByRole('link', { name: 'Start Here: Faith and AI' });
  }

  async open(token: string): Promise<void> {
    await this.page.goto(`/verify-email?token=${token}`);
    await this.heading.waitFor();
  }

  async sendANewLink(): Promise<void> {
    await this.sendNewLink.click();
  }

  /** The seconds the disabled resend button counts down from ("Resend in 42 s"), or null. */
  async resendWaitSeconds(): Promise<number | null> {
    const match = /Resend in (\d+) s/.exec((await this.resend.textContent()) ?? '');
    return match ? Number(match[1]) : null;
  }

  async resendEmail(): Promise<void> {
    await this.resend.click();
  }

  async retry(): Promise<void> {
    await this.tryAgain.click();
  }

  async confirmEmail(): Promise<void> {
    await this.confirm.click();
  }
}
