import type { Locator, Page } from '@playwright/test';

/** The navigation drawer opened from "Menu" below LG. */
export class NavDrawerDialog {
  readonly dialog: Locator;
  readonly siteNav: Locator;
  readonly closeButton: Locator;
  readonly createAccount: Locator;
  readonly signIn: Locator;

  constructor(page: Page) {
    this.dialog = page.getByRole('dialog', { name: 'Menu' });
    this.siteNav = this.dialog.getByRole('navigation', { name: 'Site' });
    this.closeButton = this.dialog.getByRole('button', { name: 'Close menu' });
    this.createAccount = this.dialog.getByRole('link', { name: 'Create account' });
    this.signIn = this.dialog.getByRole('link', { name: 'Sign in' });
  }

  async groupLabels(): Promise<string[]> {
    const labels = await this.dialog
      .locator('.sidebar-nav__group, .menu__label, .nav-drawer__group')
      .allTextContents();
    return labels.map((label) => label.trim());
  }

  async linkNames(): Promise<string[]> {
    return this.siteNav.getByRole('link').allInnerTexts();
  }

  async choose(name: string): Promise<void> {
    await this.siteNav.getByRole('link', { name, exact: true }).click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async isModal(): Promise<boolean> {
    return (await this.dialog.getAttribute('aria-modal')) === 'true';
  }

  async headingLevel(): Promise<string> {
    return this.dialog.locator('.sheet__title').evaluate((h) => h.tagName);
  }
}
