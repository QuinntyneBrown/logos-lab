import type { Locator, Page } from '@playwright/test';

/** The confirmation that opens from "Following": docs/mocks/dialogs/unfollow. */
export class UnfollowDialog {
  readonly dialog: Locator;
  readonly title: Locator;
  readonly keepFollowing: Locator;
  readonly unfollow: Locator;
  readonly close: Locator;
  readonly alert: Locator;
  readonly alertTitle: Locator;
  readonly tryAgain: Locator;

  constructor(page: Page) {
    this.dialog = page.getByRole('dialog', { name: /^Unfollow / });
    this.title = this.dialog.getByRole('heading', { level: 1 });
    this.keepFollowing = this.dialog.getByRole('button', { name: 'Keep following' });
    this.unfollow = this.dialog.getByRole('button', { name: /^Unfollow(ing…)?$/ });
    this.close = this.dialog.getByRole('button', { name: 'Close' });
    this.alert = this.dialog.locator('.alert');
    this.alertTitle = this.alert.locator('.alert__title');
    this.tryAgain = this.dialog.getByRole('button', { name: 'Try again' });
  }
}
