import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { ForbiddenPage } from '../pages/forbidden.page';

test.describe('Forbidden page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-016 AC2, L2-141 · error-page AC-1, AC-2
  test('the no-access page says so and offers the dashboard and help', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    const forbidden = new ForbiddenPage(page);

    await forbidden.open();

    await expect(forbidden.heading).toHaveText("You don't have access to this page");
    await expect(forbidden.code).toHaveText('403');
    await expect(forbidden.code).toHaveAttribute('aria-hidden', 'true');
    await expect(forbidden.dashboardLink).toHaveAttribute('href', '/dashboard');
    await expect(forbidden.helpLink).toHaveAttribute('href', 'mailto:help@logoslab.ca');
    await expect(page).toHaveTitle('No access - Logos Lab');
  });
});
