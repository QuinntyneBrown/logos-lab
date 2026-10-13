import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class ExpertsPage {
  readonly shell: AppShell;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly sub: Locator;
  readonly count: Locator;
  readonly rows: Locator;
  readonly search: Locator;
  readonly topic: Locator;
  readonly pager: Locator;
  readonly pagerText: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.sub = main.locator('.page-head__sub');
    this.count = main.locator('.toolbar__count');
    this.rows = main.locator('li.person');
    this.search = main.getByRole('searchbox', { name: 'Search experts by name' });
    this.topic = main.getByLabel('Topic');
    this.pager = main.getByRole('navigation', { name: 'Pages of experts' });
    this.pagerText = this.pager.locator('.pager__text');
  }

  async open(path = '/experts'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** Picks a topic by its visible name: "Philosophy of mind". */
  async chooseTopic(name: string): Promise<void> {
    await this.topic.selectOption({ label: name });
  }

  async goToPage(number: number): Promise<void> {
    await this.pager.getByRole('link', { name: `Page ${number}`, exact: true }).click();
  }

  /** One expert's row, by position. */
  row(index: number): Locator {
    return this.rows.nth(index);
  }
}
