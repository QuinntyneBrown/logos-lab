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
  readonly summary: Locator;
  readonly fieldError: Locator;
  readonly emptyTitle: Locator;
  readonly emptyState: Locator;
  readonly clearFilters: Locator;
  readonly loadingMessage: Locator;
  readonly skeletonRows: Locator;
  readonly tryAgain: Locator;

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
    this.summary = main.getByRole('alert').filter({ hasText: 'One thing to fix' });
    this.fieldError = main.locator('.field__error');
    this.emptyState = main.locator('.empty');
    this.emptyTitle = main.locator('.empty__title');
    this.clearFilters = this.emptyState.getByRole('button', { name: 'Clear filters' });
    this.loadingMessage = main.locator('[aria-busy="true"] [role="status"]');
    this.skeletonRows = main.locator('li.person[aria-hidden="true"]');
    this.tryAgain = main.getByRole('button', { name: 'Try again' });
  }

  async open(path = '/experts'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** Picks a topic by its visible name: "Philosophy of mind". */
  async chooseTopic(name: string): Promise<void> {
    await this.topic.selectOption({ label: name });
  }

  /** A link among the empty state's actions, such as "Browse the catalogue". */
  emptyAction(name: string): Locator {
    return this.emptyState.getByRole('link', { name });
  }

  /** Types a name into the search field and submits it. */
  async searchFor(text: string): Promise<void> {
    await this.search.fill(text);
    await this.search.press('Enter');
  }

  async goToPage(number: number): Promise<void> {
    await this.pager.getByRole('link', { name: `Page ${number}`, exact: true }).click();
  }

  /** One expert's row, by position. */
  row(index: number): Locator {
    return this.rows.nth(index);
  }
}
