import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class CollectionPage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly subtitle: Locator;
  readonly items: Locator;
  readonly rows: Locator;
  readonly aside: Locator;
  readonly curator: Locator;
  readonly facts: Locator;
  readonly progress: Locator;
  readonly progressBar: Locator;
  readonly statuses: Locator;
  readonly progressNotice: Locator;
  readonly tryAgain: Locator;
  readonly follow: Locator;
  readonly loadingMessages: Locator;
  readonly skeletonCards: Locator;
  readonly emptyState: Locator;
  readonly emptyTitle: Locator;
  readonly followStatus: Locator;
  readonly followAlertTitle: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.subtitle = main.locator('.page-head__sub');
    this.items = main.getByRole('list', { name: 'Items in order' });
    this.rows = this.items.locator('.content-card');
    this.aside = main.getByRole('complementary', { name: 'About this collection' });
    this.curator = this.aside.getByRole('region', { name: 'Curated by' });
    this.facts = this.aside.locator('dl > div');
    this.progress = main.getByRole('region', { name: 'Your progress' });
    this.progressBar = this.progress.getByRole('progressbar', { name: 'Collection progress' });
    this.statuses = this.rows.locator('.content-card__status, .content-card__progress > span');
    this.progressNotice = main.locator('.alert');
    this.tryAgain = main.getByRole('button', { name: 'Try again' });
    this.loadingMessages = main.locator('[aria-busy="true"] [role="status"], [role="status"].vh');
    this.skeletonCards = main.locator('.skeleton-card');
    this.emptyState = main.locator('.empty');
    this.emptyTitle = main.locator('.empty__title');
    const actions = main.locator('.page-head__actions');
    this.follow = actions.getByRole('button', { name: /^Follow(ing)?$/ });
    this.followStatus = actions.getByRole('status');
    this.followAlertTitle = main.locator('.collection__follow-alert .alert__title');
  }

  /** The type line of each row: "1 · Article". */
  async typeLines(): Promise<string[]> {
    return this.rows.locator('.content-card__type').allTextContents();
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
