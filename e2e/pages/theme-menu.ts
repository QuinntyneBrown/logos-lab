import type { Locator, Page } from '@playwright/test';

/** The theme choice: the top bar's theme menu (LG and up) or the drawer's inline menu. */
export class ThemeMenu {
  readonly menu: Locator;

  constructor(
    private readonly page: Page,
    scope: Locator | Page = page,
    role: 'menu' | 'group' = 'menu',
  ) {
    this.menu = scope.getByRole(role, { name: 'Theme' });
  }

  /** The theme choices as a labelled group inside another menu, such as the account menu. */
  static inGroup(page: Page, scope: Locator): ThemeMenu {
    return new ThemeMenu(page, scope, 'group');
  }

  option(name: 'Match my device' | 'Light' | 'Dark'): Locator {
    return this.menu.getByRole('menuitemradio', { name });
  }

  async optionNames(): Promise<string[]> {
    await this.menu.waitFor();
    return this.menu.getByRole('menuitemradio').allInnerTexts();
  }

  async choose(name: 'Match my device' | 'Light' | 'Dark'): Promise<void> {
    await this.option(name).click();
  }

  focusedOption(): Locator {
    return this.menu.locator(':focus');
  }
}
