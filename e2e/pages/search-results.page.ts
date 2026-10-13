import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';
import { ContentCard } from './content-card';

export class SearchResultsPage {
  readonly shell: AppShell;
  readonly eyebrow: Locator;
  readonly heading: Locator;
  readonly sub: Locator;
  readonly search: Locator;
  readonly searchButton: Locator;
  readonly tabs: Locator;
  readonly currentTab: Locator;
  readonly groupHeadings: Locator;
  readonly summary: Locator;
  readonly fieldError: Locator;
  readonly emptyTitle: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.eyebrow = main.locator('.page-head .eyebrow');
    this.heading = page.getByRole('heading', { level: 1 });
    this.sub = main.locator('.page-head__sub');
    this.search = main.getByRole('searchbox', { name: 'Search Logos Lab' });
    this.searchButton = main.getByRole('button', { name: 'Search', exact: true });
    const nav = main.getByRole('navigation', { name: 'Result types' });
    this.tabs = nav.getByRole('link');
    this.currentTab = nav.locator('[aria-current="page"]');
    this.groupHeadings = main.locator('section.page-block .section__title');
    this.summary = main.getByRole('alert').filter({ hasText: 'One thing to fix' });
    this.fieldError = main.locator('.field__error');
    this.emptyTitle = main.locator('.empty__title');
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  /** A result group, named by its type: "Courses", "Videos", "Experts". */
  group(name: string): Locator {
    return this.shell.main.getByRole('region', { name: new RegExp(`^${name}\\b`) });
  }

  /** Types a query into the page's own search field and submits it. */
  async submitSearch(text: string): Promise<void> {
    await this.search.fill(text);
    await this.search.press('Enter');
  }

  /** A link in the empty state's actions, such as "Browse the catalogue". */
  emptyAction(name: string): Locator {
    return this.shell.main.locator('.empty__actions').getByRole('link', { name });
  }

  /** Follows a result-type tab by its name: "Videos". */
  async chooseTab(name: string): Promise<void> {
    await this.tabs.filter({ hasText: name }).click();
  }

  card(group: Locator, index: number): ContentCard {
    return new ContentCard(group.locator('.content-card').nth(index));
  }

  cards(group: Locator): Locator {
    return group.locator('.content-card');
  }

  people(group: Locator): Locator {
    return group.locator('li.person');
  }

  /** The "All 3 videos" link in a group's heading. */
  moreLink(group: Locator): Locator {
    return group.getByRole('link', { name: /^All \d+/ });
  }

  /** The status message the busy results announce while searching. */
  loadingMessage(): Locator {
    return this.shell.main.locator('[aria-busy="true"] [role="status"]');
  }

  skeletonCards(): Locator {
    return this.shell.main.locator('.skeleton-card');
  }
}
