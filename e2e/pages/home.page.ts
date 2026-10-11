import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class HomePage {
  readonly shell: AppShell;
  readonly hero: Locator;
  readonly heading: Locator;
  readonly heroSearch: Locator;
  readonly heroSearchButton: Locator;
  readonly browseCatalogue: Locator;
  readonly heroPhoto: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.hero = page.locator('section.hero');
    this.heading = page.getByRole('heading', { level: 1 });
    this.heroSearch = this.hero.getByRole('searchbox', {
      name: 'Search courses, videos, articles and experts',
    });
    this.heroSearchButton = this.hero.getByRole('button', { name: 'Search' });
    this.browseCatalogue = this.hero.getByRole('link', { name: 'Browse the catalogue' });
    this.heroPhoto = this.hero.locator('.photo img');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await this.heading.waitFor();
  }

  async headingCount(): Promise<number> {
    return this.page.getByRole('heading', { level: 1 }).count();
  }

  title(): Promise<string> {
    return this.page.title();
  }
}
