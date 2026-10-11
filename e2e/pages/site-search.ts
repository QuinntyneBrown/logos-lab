import type { Locator, Page } from '@playwright/test';

/** The top bar's site search with its suggestions (combobox). */
export class SiteSearch {
  readonly input: Locator;
  readonly list: Locator;
  readonly status: Locator;
  readonly foot: Locator;
  readonly announcement: Locator;

  constructor(private readonly page: Page) {
    this.input = page.getByRole('combobox', { name: 'Search Logos Lab' }).filter({ visible: true });
    this.list = page.locator('.combobox__list').filter({ visible: true });
    this.status = this.list.locator('.combobox__status');
    this.foot = this.list.locator('.combobox__foot');
    this.announcement = this.input
      .locator('xpath=ancestor::div[contains(@class, "combobox")]')
      .locator('[aria-live="polite"]');
  }

  async type(query: string): Promise<void> {
    await this.input.fill(query);
  }

  async press(key: string): Promise<void> {
    await this.input.press(key);
  }

  async groupLabels(): Promise<string[]> {
    return this.list.locator('.combobox__group').allTextContents();
  }

  option(index: number) {
    const root = this.list.getByRole('option').nth(index);
    return {
      root,
      text: root.locator('.combobox__text'),
      highlighted: root.locator('mark'),
      meta: root.locator('.combobox__meta'),
    };
  }

  options(): Locator {
    return this.list.locator('.combobox__option');
  }
}
