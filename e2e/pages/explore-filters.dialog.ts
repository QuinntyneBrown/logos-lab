import type { Locator, Page } from '@playwright/test';

/** The filters sheet opened from "Filters" below LG. */
export class ExploreFiltersDialog {
  readonly dialog: Locator;
  readonly summary: Locator;
  readonly primary: Locator;
  readonly cancel: Locator;
  readonly clearAll: Locator;
  readonly close: Locator;

  constructor(page: Page) {
    this.dialog = page.getByRole('dialog', { name: 'Filters' });
    this.summary = this.dialog.locator('.field__help');
    this.primary = this.dialog.getByRole('button', { name: /^(Show\s\d|Counting)/ });
    this.cancel = this.dialog.getByRole('button', { name: 'Cancel' });
    this.clearAll = this.dialog.getByRole('button', { name: 'Clear all' });
    this.close = this.dialog.getByRole('button', { name: 'Close filters' });
  }

  /** One option of a group, named by its label: "Course". */
  option(group: string, label: string): Locator {
    return this.dialog
      .getByRole('group', { name: group })
      .getByRole('checkbox', { name: new RegExp(`^${label}\\b`) });
  }

  async choose(group: string, label: string): Promise<void> {
    await this.option(group, label).check();
  }
}
