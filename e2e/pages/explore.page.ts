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
  readonly sort: Locator;
  readonly pager: Locator;
  readonly loadingMessage: Locator;
  readonly skeletonCards: Locator;
  readonly emptyTitle: Locator;
  readonly emptyState: Locator;
  readonly tryAgain: Locator;
  readonly warning: Locator;
  readonly checkAgain: Locator;
  readonly pagerText: Locator;
  readonly pagerLinks: Locator;
  readonly pills: Locator;
  readonly clearAllInPills: Locator;
  readonly clearAllInPanel: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.sub = main.locator('.page-head__sub');
    this.count = main.locator('.toolbar__count');
    this.cards = main.locator('.content-card');
    this.filters = main.getByRole('complementary', { name: 'Filters' });
    this.sort = main.getByLabel('Sort by');
    this.pager = main.getByRole('navigation', { name: 'Pages of the catalogue' });
    this.loadingMessage = main.locator('[aria-busy="true"] [role="status"]');
    this.skeletonCards = main.locator('.skeleton-card');
    this.emptyState = main.locator('.empty');
    this.emptyTitle = main.locator('.empty__title');
    this.tryAgain = main.getByRole('button', { name: 'Try again' });
    this.warning = main.locator('.alert--warning');
    this.checkAgain = main.getByRole('button', { name: 'Check again' });
    this.pagerText = this.pager.locator('.pager__text');
    this.pagerLinks = this.pager.getByRole('link');
    const active = main.getByRole('list', { name: 'Active filters' });
    this.pills = active.locator('.pill');
    this.clearAllInPills = active.getByRole('button', { name: 'Clear all' });
    this.clearAllInPanel = this.filters.getByRole('button', { name: 'Clear all' });
  }

  async open(path = '/explore'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** A numbered link of the pager: its name is "Page 2". */
  pageLink(number: number): Locator {
    return this.pager.getByRole('link', { name: `Page ${number}`, exact: true });
  }

  async goToPage(number: number): Promise<void> {
    await this.pageLink(number).click();
  }

  /** Picks a sort by its visible name: "Most popular". */
  async sortBy(name: string): Promise<void> {
    await this.sort.selectOption({ label: name });
  }

  /** Removes an active filter by its pill text: "Type: Course". */
  async removePill(text: string): Promise<void> {
    await this.shell.main.getByRole('button', { name: `Remove filter ${text}` }).click();
  }

  /** A filter group of the panel, named by its legend: "Type", "Topic". */
  group(name: string): Locator {
    return this.filters.getByRole('group', { name });
  }

  /** One option of a group, named by its label: "Course". */
  option(group: string, label: string): Locator {
    return this.group(group).getByRole('checkbox', { name: new RegExp(`^${label}\\b`) });
  }

  /** The options of a group that are on. */
  checkedOptions(group: string): Locator {
    return this.group(group).getByRole('checkbox', { checked: true });
  }

  /** The "Show all 12 topics" button of the panel. */
  showAll(name: string): Locator {
    return this.filters.getByRole('button', { name });
  }

  async choose(group: string, label: string): Promise<void> {
    await this.option(group, label).check();
  }

  /** The visible names of a group's options, with their counts: "Course 24". */
  optionNames(group: string): Locator {
    return this.group(group).locator('label').filter({ visible: true });
  }

  card(index: number): ContentCard {
    return new ContentCard(this.cards.nth(index));
  }
}
