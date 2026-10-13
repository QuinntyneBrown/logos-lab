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
  readonly filters: Locator;
  readonly format: Locator;
  readonly topic: Locator;
  readonly host: Locator;
  readonly recording: Locator;
  readonly pills: Locator;
  readonly count: Locator;
  readonly loadingMessage: Locator;
  readonly skeletonRows: Locator;
  readonly tryAgain: Locator;
  readonly showMore: Locator;
  readonly moreText: Locator;
  readonly moreMeter: Locator;
  readonly moreFailed: Locator;
  readonly emptyState: Locator;
  readonly emptyTitle: Locator;
  readonly clearFilters: Locator;
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
    this.filters = main.getByRole('form', { name: 'Filter events' });
    this.format = this.filters.getByLabel('Format');
    this.topic = this.filters.getByLabel('Topic');
    this.host = this.filters.getByLabel('Host');
    this.recording = this.filters.getByLabel('Recording available');
    this.pills = main.getByRole('list', { name: 'Active filters' }).getByRole('listitem');
    this.emptyState = main.locator('.empty');
    this.emptyTitle = main.locator('.empty__title');
    this.clearFilters = this.emptyState.getByRole('button', { name: 'Clear filters' });
    this.showMore = main.getByRole('button', { name: /^Show \d+ more events$/ });
    this.moreText = main.locator('.pager__text');
    this.moreMeter = main.locator('.pager__meter');
    this.moreFailed = main.getByRole('alert').filter({ hasText: "couldn't show more events" });
    this.loadingMessage = main.locator('[aria-busy="true"] [role="status"]');
    this.skeletonRows = main.locator('li.event[aria-hidden="true"]');
    this.tryAgain = main.getByRole('button', { name: 'Try again' });
    this.count = main.locator('.toolbar__count');
    this.rows = main.locator('li.event');
  }

  async open(path = '/events'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** A link among the empty state's actions, such as "See past events". */
  emptyAction(name: string): Locator {
    return this.emptyState.getByRole('link', { name });
  }

  /** One event's row, by position. */
  row(index: number): Locator {
    return this.rows.nth(index);
  }

  /** Removes one active filter by its pill's text: "Format: In person". */
  async removeFilter(label: string): Promise<void> {
    await this.pills
      .filter({ hasText: label })
      .getByRole('button', { name: `Remove filter ${label}` })
      .click();
  }
}
