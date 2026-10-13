import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';
import { ContentCard } from './content-card';

export class TopicPage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly lead: Locator;
  readonly sub: Locator;
  readonly experts: Locator;
  readonly expertRows: Locator;
  readonly count: Locator;
  readonly cards: Locator;
  readonly pager: Locator;
  readonly pagerText: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.lead = main.locator('.lead');
    this.sub = main.locator('.page-head__sub');
    this.experts = main.getByRole('region', { name: 'Experts in this topic' });
    this.expertRows = this.experts.locator('li.person');
    this.count = main.locator('.toolbar__count');
    this.cards = main.locator('.content-card');
    this.pager = main.getByRole('navigation', { name: /^Pages of / });
    this.pagerText = this.pager.locator('.pager__text');
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  async goToPage(number: number): Promise<void> {
    await this.pager.getByRole('link', { name: `Page ${number}`, exact: true }).click();
  }

  card(index: number): ContentCard {
    return new ContentCard(this.cards.nth(index));
  }
}
