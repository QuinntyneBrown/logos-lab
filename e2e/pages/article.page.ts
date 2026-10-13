import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class ArticlePage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly subtitle: Locator;
  readonly byline: Locator;
  readonly contributors: Locator;
  readonly dates: Locator;
  readonly cover: Locator;
  readonly body: Locator;
  readonly topics: Locator;
  readonly correction: Locator;
  readonly related: Locator;
  readonly commentsLink: Locator;
  readonly comments: Locator;
  readonly save: Locator;
  readonly saveStatus: Locator;
  readonly saveAlert: Locator;
  readonly saveAlertTitle: Locator;
  readonly relatedCards: Locator;
  readonly correctionTitle: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.subtitle = main.locator('.page-head__sub');
    this.byline = main.locator('.page-head .cluster');
    this.contributors = this.byline.getByRole('link');
    this.dates = this.byline.locator('time');
    this.cover = main.locator('.article__cover');
    this.body = main.getByRole('article');
    this.topics = main.getByRole('list', { name: 'Topics' });
    this.correction = main.locator('.alert');
    this.related = main.getByRole('region', { name: 'Related' });
    this.commentsLink = main
      .locator('.page-head__actions')
      .getByRole('link', { name: /comments?$/ });
    this.comments = main.getByRole('region', { name: /^Comments/ });
    const actions = main.locator('.page-head__actions');
    this.save = actions.getByRole('button', { name: /^Save(d)?$/ });
    this.saveStatus = actions.getByRole('status');
    this.saveAlert = main.locator('.article-page__save-alert');
    this.saveAlertTitle = this.saveAlert.locator('.alert__title');
    this.relatedCards = this.related.locator('.content-card');
    this.correctionTitle = this.correction.locator('.alert__title');
  }

  /** The save toggle of one related card, by the item's title. */
  relatedSave(title: string): Locator {
    return this.related.getByRole('button', { name: new RegExp(`${title}$`) });
  }

  async bodyScriptRan(): Promise<boolean> {
    return this.page.evaluate(
      () => (window as unknown as { __articleScriptRan?: boolean }).__articleScriptRan === true,
    );
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
