import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class EventsPage {
  readonly shell: AppShell;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly sub: Locator;
  readonly tabs: Locator;
  readonly upcomingTab: Locator;
  readonly pastTab: Locator;
  readonly count: Locator;
  readonly rows: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.sub = main.locator('.page-head__sub');
    this.tabs = main.getByRole('navigation', { name: 'When' });
    this.upcomingTab = this.tabs.getByRole('link', { name: 'Upcoming' });
    this.pastTab = this.tabs.getByRole('link', { name: 'Past' });
    this.count = main.locator('.toolbar__count');
    this.rows = main.locator('li.event');
  }

  async open(path = '/events'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** One event's row, by position. */
  row(index: number): Locator {
    return this.rows.nth(index);
  }
}
