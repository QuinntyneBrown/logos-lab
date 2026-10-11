import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class NotFoundPage {
  readonly shell: AppShell;
  readonly code: Locator;
  readonly heading: Locator;
  readonly search: Locator;
  readonly homeLink: Locator;
  readonly catalogueLink: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    const body = page.locator('.error-page');
    this.code = body.locator('.error-page__code');
    this.heading = page.getByRole('heading', { level: 1 });
    this.search = body.getByRole('searchbox', {
      name: 'Search courses, videos, articles and experts',
    });
    this.homeLink = body.getByRole('link', { name: 'Go to the home page' });
    this.catalogueLink = body.getByRole('link', { name: 'Browse the catalogue' });
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  async searchFor(query: string): Promise<void> {
    await this.search.fill(query);
    await this.search.press('Enter');
  }
}
