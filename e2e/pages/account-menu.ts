import type { Locator, Page } from '@playwright/test';

/** The account menu opened from the avatar button (LG and up). */
export class AccountMenu {
  readonly menu: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.menu = page.getByRole('menu', { name: 'Your account' });
    this.header = this.menu.locator('.menu__header');
  }

  async itemNames(): Promise<string[]> {
    await this.menu.waitFor();
    const items = await this.menu.getByRole('menuitem').allInnerTexts();
    return items.map((item) => item.trim());
  }

  async groupLabels(): Promise<string[]> {
    const labels = await this.menu.locator('.menu__label').allTextContents();
    return labels.map((label) => label.trim());
  }

  item(name: string): Locator {
    return this.menu.getByRole('menuitem', { name, exact: true });
  }

  async choose(name: string): Promise<void> {
    await this.item(name).click();
  }
}
