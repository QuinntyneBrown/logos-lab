import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';
import { ContentCard } from './content-card';

export class ExplorePage {
  readonly shell: AppShell;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly sub: Locator;
  readonly count: Locator;
  readonly cards: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.sub = main.locator('.page-head__sub');
    this.count = main.locator('.toolbar__count');
    this.cards = main.locator('.content-card');
  }

  async open(path = '/explore'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  card(index: number): ContentCard {
    return new ContentCard(this.cards.nth(index));
  }
}
