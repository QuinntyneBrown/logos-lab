import { expect, test } from '../fixtures/test';
import { HomePage } from '../pages/home.page';
import { NotFoundPage } from '../pages/not-found.page';

// L2-126 AC5, L2-127 AC4
test('after in-app navigation, focus moves to the new main heading and the title changes', async ({
  page,
}) => {
  const notFound = new NotFoundPage(page);
  await notFound.open('/no-such-page');

  await notFound.goHome();

  const home = new HomePage(page);
  await expect(home.heading).toBeFocused();
  await expect(page).toHaveTitle('Home - Logos Lab');
});

// L2-126 AC1: a first load leaves focus at the top so the skip link stays first
test('on a first load, focus is not moved to the heading', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await expect(home.heading).not.toBeFocused();
});
