import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class ExpertProfilePage {
  readonly shell: AppShell;
  readonly breadcrumb: Locator;
  readonly header: Locator;
  readonly photo: Locator;
  readonly heading: Locator;
  readonly subline: Locator;
  readonly facts: Locator;
  readonly bio: Locator;
  readonly expertise: Locator;
  readonly elsewhere: Locator;
  readonly tabs: Locator;
  readonly panel: Locator;
  readonly cards: Locator;
  readonly loadingMessages: Locator;
  readonly skeletonCards: Locator;
  readonly emptyState: Locator;
  readonly emptyTitle: Locator;
  readonly tryAgain: Locator;
  readonly follow: Locator;
  readonly followStatus: Locator;
  readonly followAlert: Locator;
  readonly followAlertTitle: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const main = this.shell.main;
    this.breadcrumb = main.getByRole('navigation', { name: 'Breadcrumb' });
    this.header = main.locator('header.profile-head');
    this.photo = this.header.locator('.profile-head__photo');
    this.heading = page.getByRole('heading', { level: 1 });
    this.subline = this.header.locator('.profile-head__sub');
    this.facts = this.header.locator('.profile-head__meta > span');
    this.bio = main.getByRole('region', { name: /^About / }).locator('.prose');
    this.expertise = main.getByRole('list', { name: 'Areas of expertise' });
    const tablist = main.getByRole('tablist', { name: 'Published content by type' });
    this.tabs = tablist.getByRole('tab');
    this.panel = main.getByRole('tabpanel');
    this.cards = this.panel.locator('.content-card');
    this.loadingMessages = main.locator('[aria-busy="true"] [role="status"], [role="status"].vh');
    this.skeletonCards = main.locator('.skeleton-card');
    this.emptyState = main.locator('.empty');
    this.emptyTitle = main.locator('.empty__title');
    this.tryAgain = main.getByRole('button', { name: 'Try again' });
    this.follow = this.header.getByRole('button', { name: /^Follow(ing)?$/ });
    this.followStatus = this.header.getByRole('status');
    this.followAlert = main.locator('.alert');
    this.followAlertTitle = this.followAlert.locator('.alert__title');
    this.elsewhere = main
      .getByRole('heading', { name: 'Elsewhere' })
      .locator('xpath=following-sibling::ul[1]');
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /** One tab by its label: "Articles". */
  tab(label: string): Locator {
    return this.tabs.filter({ hasText: label });
  }

  /** Whether a script inside the bio ran: it must not. */
  async bioScriptRan(): Promise<boolean> {
    return this.page.evaluate(
      () => (window as unknown as { __bioScriptRan?: boolean }).__bioScriptRan === true,
    );
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
