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
  readonly filters: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.sub = main.locator('.page-head__sub');
    this.count = main.locator('.toolbar__count');
    this.cards = main.locator('.content-card');
    this.filters = main.getByRole('complementary', { name: 'Filters' });
  }

  async open(path = '/explore'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** A filter group of the panel, named by its legend: "Type", "Topic". */
  group(name: string): Locator {
    return this.filters.getByRole('group', { name });
  }

  /** One option of a group, named by its label: "Course". */
  option(group: string, label: string): Locator {
    return this.group(group).getByRole('checkbox', { name: new RegExp(`^${label}\\b`) });
  }

  async choose(group: string, label: string): Promise<void> {
    await this.option(group, label).check();
  }

  /** The visible names of a group's options, with their counts: "Course 24". */
  optionNames(group: string): Locator {
    return this.group(group).locator('label');
  }

  card(index: number): ContentCard {
    return new ContentCard(this.cards.nth(index));
  }
}
