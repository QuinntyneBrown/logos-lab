import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class ExpertProfilePage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly header: Locator;
  readonly photo: Locator;
  readonly heading: Locator;
  readonly subline: Locator;
  readonly facts: Locator;
  readonly bio: Locator;
  readonly expertise: Locator;
  readonly elsewhere: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.header = main.locator('header.profile-head');
    this.photo = this.header.locator('.profile-head__photo');
    this.heading = page.getByRole('heading', { level: 1 });
    this.subline = this.header.locator('.profile-head__sub');
    this.facts = this.header.locator('.profile-head__meta > span');
    this.bio = main.getByRole('region', { name: /^About / }).locator('.prose');
    this.expertise = main.getByRole('list', { name: 'Areas of expertise' });
    this.elsewhere = main
      .getByRole('heading', { name: 'Elsewhere' })
      .locator('xpath=following-sibling::ul[1]');
  }

  /** Whether a script inside the bio ran: it must not. */
  async bioScriptRan(): Promise<boolean> {
    return this.page.evaluate(
      () => (window as unknown as { __bioScriptRan?: boolean }).__bioScriptRan === true,
    );
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
