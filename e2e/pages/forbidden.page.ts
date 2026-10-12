import type { Locator, Page } from '@playwright/test';

export class ForbiddenPage {
  readonly code: Locator;
  readonly heading: Locator;
  readonly text: Locator;
  readonly dashboardLink: Locator;
  readonly helpLink: Locator;

  constructor(private readonly page: Page) {
    const body = page.locator('.error-page');
    this.code = body.locator('.error-page__code');
    this.heading = page.getByRole('heading', { level: 1 });
    this.text = body.locator('.error-page__text');
    this.dashboardLink = body.getByRole('link', { name: 'Go to your dashboard' });
    this.helpLink = body.getByRole('link', { name: 'Write to help@logoslab.ca' });
  }

  async open(path = '/403'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }
}
