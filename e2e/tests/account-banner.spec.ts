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

test.describe('Resending from the account banner', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page, api }) => {
    await page.clock.install({ time: new Date('2026-10-13T14:00:00Z') });
    api.respond('GET', '/home', homePage());
    api.respond('GET', '/me', members.ethan);
  });

  // L2-007 AC3, AC4 · banner AC-9
  test('resending says a new link went out, and the banner can be dismissed', async ({
    page,
    api,
  }) => {
    api.respond('POST', '/auth/email-verifications/resend', {
      sentTo: 'ethan.wu@example.ca',
      retryAfterSeconds: 60,
      remainingToday: 4,
    });
    const home = new HomePage(page);
    const banner = new AccountBanner(page);
    await home.open();

    await banner.resendEmail();

    await expect(banner.text).toHaveText(
      "We sent a new verification link to ethan.wu@example.ca. It works for 24 hours; check your spam folder if it isn't there in a few minutes.",
    );
    expect(api.requestsTo('POST', '/auth/email-verifications/resend')).toHaveLength(1);
    await expect(banner.root).toHaveRole('status');
    await expect(banner.root).not.toHaveClass(/banner--warning/);
    await expect(banner.resend).toHaveCount(0);
    await expect(banner.dismiss).toHaveAccessibleName('Dismiss');

    await banner.dismissIt();
    await expect(banner.root).toHaveCount(0);
  });

  // L2-007 AC4
  test('resending too soon pauses the button for as long as the server says', async ({
    page,
    api,
  }) => {
    api.fail(
      'POST',
      '/auth/email-verifications/resend',
      429,
      'too-many-requests',
      {},
      {
        'Retry-After': '42',
      },
    );
    const home = new HomePage(page);
    const banner = new AccountBanner(page);
    await home.open();

    await banner.resendEmail();

    await expect(banner.resend).toBeDisabled();
    await expect(banner.resend).toHaveText(/Resend in \d+ s/);
    await expect(banner.text).toContainText('Verify your email');

    await page.clock.runFor(42_000);
    await expect(banner.resend).toHaveText('Resend email');
    await expect(banner.resend).toBeEnabled();
  });
});
