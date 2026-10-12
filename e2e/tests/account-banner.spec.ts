import { homePage } from '../data/home';
import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { AccountBanner } from '../pages/account-banner';
import { HomePage } from '../pages/home.page';

test.describe('Account banner', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page, api }) => {
    await page.clock.install({ time: new Date('2026-10-13T14:00:00Z') });
    api.respond('GET', '/home', homePage());
  });

  // L2-007 AC3 · banner AC-1, AC-8
  test('an unverified member is asked to verify, below the header', async ({ page, api }) => {
    api.respond('GET', '/me', members.ethan);
    const home = new HomePage(page);
    const banner = new AccountBanner(page);

    await home.open();

    await expect(banner.root).toHaveRole('region');
    await expect(banner.root).toHaveClass(/banner--warning/);
    await expect(banner.text).toHaveText(
      'Verify your email to enrol, comment, register for events and send messages. We sent a link to ethan.wu@example.ca.',
    );
    await expect(banner.resend).toHaveText('Resend email');
    await expect(banner.dismiss).toHaveAccessibleName('Dismiss for now');
  });

  // L2-007 AC3 · banner AC-6
  test('dismissing hides the banner until the next sign-in', async ({ page, api }) => {
    api.respond('GET', '/me', members.ethan);
    const home = new HomePage(page);
    const banner = new AccountBanner(page);
    await home.open();

    await banner.dismissIt();

    await expect(banner.root).toHaveCount(0);
    await page.reload();
    await home.open();
    await expect(banner.root).toHaveCount(0);
  });

  // L2-007
  test('a verified member and a visitor see no account banner', async ({ page, api }) => {
    const home = new HomePage(page);
    const banner = new AccountBanner(page);

    await home.open();
    await expect(banner.root).toHaveCount(0);

    api.respond('GET', '/me', members.miriam);
    await home.open();
    await expect(home.shell.accountButton).toBeVisible();
    await expect(banner.root).toHaveCount(0);
  });
});
