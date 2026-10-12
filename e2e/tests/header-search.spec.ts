import { expect, test } from '../fixtures/test';
import { HomePage } from '../pages/home.page';

test.describe('Header search at XL', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-131 AC1 · top-bar AC-15, text-field AC-2
  test('the wide search field sits in the top bar and opens the results', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await expect(home.shell.siteSearch).toBeVisible();
    await expect(home.shell.siteSearch).toHaveAttribute('maxlength', '200');
    await expect(home.shell.searchButton).toBeHidden();

    await home.shell.searchSite('personhood');

    await expect(page).toHaveURL('/search?q=personhood');
  });
});

test.describe('Header search below XL', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  // L2-131 AC2 · top-bar AC-14
  test('the search icon opens a search row; Escape closes it and returns focus', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(home.shell.siteSearch).toBeHidden();
    await expect(home.shell.searchButton).toHaveAccessibleName('Search');

    await home.shell.openSearch();

    await expect(home.shell.siteSearch).toBeFocused();
    await home.shell.pressEscape();

    await expect(home.shell.siteSearch).toBeHidden();
    await expect(home.shell.searchButton).toBeFocused();
  });

  // L2-131 AC2, L2-003
  test('searching from the search row opens the results and closes the row', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await home.shell.openSearch();
    await home.shell.searchSite('Augustine');

    await expect(page).toHaveURL('/search?q=Augustine');
    await expect(home.shell.siteSearch).toBeHidden();
  });

  // L2-130 AC2
  test('at 320px the open search row fits without horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    const home = new HomePage(page);
    await home.open();

    await home.shell.openSearch();

    expect(await home.shell.hasHorizontalScroll()).toBe(false);
  });
});
