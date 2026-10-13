import type { Locator, Page } from '@playwright/test';

/** The confirmation that opens from "Leave course": docs/mocks/dialogs/leave-course. */
export class LeaveCourseDialog {
  readonly dialog: Locator;
  readonly title: Locator;
  readonly stay: Locator;
  readonly leave: Locator;
  readonly leaving: Locator;
  readonly tryAgain: Locator;
  readonly alert: Locator;
  readonly alertTitle: Locator;
  readonly explore: Locator;
  readonly myLearning: Locator;
  readonly close: Locator;

  constructor(page: Page) {
    this.dialog = page.getByRole('dialog', { name: /^(Leave |You’ve left )/ });
    this.title = this.dialog.getByRole('heading', { level: 1 });
    this.stay = this.dialog.getByRole('button', { name: 'Stay enrolled' });
    this.leave = this.dialog.getByRole('button', { name: 'Leave course' });
    this.leaving = this.dialog.getByRole('button', { name: 'Leaving…' });
    this.tryAgain = this.dialog.getByRole('button', { name: 'Try again' });
    this.alert = this.dialog.locator('.alert');
    this.alertTitle = this.alert.locator('.alert__title');
    this.explore = this.dialog.getByRole('link', { name: 'Explore courses' });
    this.myLearning = this.dialog.getByRole('link', { name: 'Go to My learning' });
    this.close = this.dialog.getByRole('button', { name: 'Close' });
  }
}
