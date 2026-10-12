import type { Locator, Page } from '@playwright/test';
import { AppShell } from './app-shell';

export class SettingsProfilePage {
  readonly shell: AppShell;
  readonly settingsNav: Locator;
  readonly currentSection: Locator;
  readonly heading: Locator;
  readonly eyebrow: Locator;
  readonly sub: Locator;

  constructor(private readonly page: Page) {
    this.shell = new AppShell(page);
    this.settingsNav = page.getByRole('navigation', { name: 'Settings' });
    this.currentSection = this.settingsNav.locator('[aria-current="page"]');
    this.heading = page.getByRole('heading', { level: 1 });
    const head = page.locator('.page-head');
    this.eyebrow = head.locator('.eyebrow');
    this.sub = head.locator('.page-head__sub');
  }

  async open(path = '/settings/profile'): Promise<void> {
    await this.page.goto(path);
    await this.heading.waitFor();
  }

  sections(): Locator {
    return this.settingsNav.getByRole('link');
  }
}
