import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';
import type { RegisterField } from './register-field';

export class RegisterPage {
  readonly shell: AppShell;
  readonly heading: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly showPassword: Locator;
  readonly terms: Locator;
  readonly news: Locator;
  readonly submit: Locator;
  readonly signIn: Locator;
  readonly alert: Locator;
  readonly summary: Locator;
  private readonly card: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.card = page.locator('.auth__card');
    this.heading = page.getByRole('heading', { level: 1 });
    this.name = this.card.getByLabel('Your name', { exact: true });
    this.email = this.card.getByLabel('Email', { exact: true });
    this.password = this.card.getByLabel('Password', { exact: true });
    this.showPassword = this.card.getByRole('button', { name: 'Show' });
    this.terms = this.card.getByRole('checkbox', { name: /I accept the Terms of Use/ });
    this.news = this.card.getByRole('checkbox', { name: /Email me Platform news/ });
    this.submit = this.card.locator('button[type="submit"]');
    this.signIn = this.card.locator('.auth__alt').getByRole('link', { name: 'Sign in' });
    this.alert = this.card.locator('.alert');
    this.summary = this.card.locator('.form-summary');
  }

  async fill(details: {
    name?: string;
    email?: string;
    password?: string;
    terms?: boolean;
    news?: boolean;
  }): Promise<void> {
    if (details.name !== undefined) await this.name.fill(details.name);
    if (details.email !== undefined) await this.email.fill(details.email);
    if (details.password !== undefined) await this.password.fill(details.password);
    if (details.terms) await this.terms.check();
    if (details.news) await this.news.check();
  }

  async create(): Promise<void> {
    await this.submit.click();
  }

  summaryLinks(): Locator {
    return this.summary.getByRole('link');
  }

  errorFor(field: RegisterField): Locator {
    return this.card.locator(`#${field}-error`);
  }

  async open(): Promise<void> {
    await this.page.goto('/register');
    await this.heading.waitFor();
  }

  /** The help shown in a field. */
  helpFor(field: RegisterField): Locator {
    return this.card.locator(`#${field}-help`);
  }

  /** Whether the help sits between the field's label and its control, as the mock places it. */
  helpComesBefore(control: Locator): Promise<boolean> {
    return control.evaluate((input) => {
      const help = input.closest('.field')?.querySelector('.field__help');
      return !!help && !!(help.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
  }

  describedBy(control: Locator): Promise<string | null> {
    return control.getAttribute('aria-describedby');
  }

  helpLink(field: RegisterField, name: string): Locator {
    return this.helpFor(field).getByRole('link', { name });
  }
}
