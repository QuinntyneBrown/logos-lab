import { expect, test } from '../fixtures/test';
import { HomePage } from '../pages/home.page';
import { NotFoundPage } from '../pages/not-found.page';

test.describe('Not found page', () => {
  // L2-141 AC1 · error-page AC-1, AC-2
  test('an unknown address explains the page is missing and offers search, home and the catalogue', async ({
    page,
  }) => {
    const notFound = new NotFoundPage(page);
    await notFound.open('/no-such-page');

    await expect(notFound.heading).toHaveText("We can't find that page");
    await expect(notFound.code).toHaveText('404');
    await expect(notFound.code).toHaveAttribute('aria-hidden', 'true');
    await expect(notFound.search).toBeVisible();
    await expect(notFound.homeLink).toHaveAttribute('href', '/');
    await expect(notFound.catalogueLink).toHaveAttribute('href', '/explore');
    await expect(page).toHaveTitle('Page not found - Logos Lab');
  });

  // L2-141 AC1, L2-003 · text-field AC-3
  test('searching from the not found page opens the results for the query', async ({ page }) => {
    const notFound = new NotFoundPage(page);
    await notFound.open('/no-such-page');

    await notFound.searchFor('Augustine');

    await expect(page).toHaveURL('/search?q=Augustine');
  });
});

test.describe('Home search', () => {
  // L2-001, L2-003 · text-field AC-3, AC-4
  test('a trimmed query opens the search results; an empty one does nothing', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();

    await home.searchFor('   ');
    await expect(page).toHaveURL('/');

    await home.searchFor('  personhood ');
    await expect(page).toHaveURL('/search?q=personhood');
  });
});
