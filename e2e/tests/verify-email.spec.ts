import { expect, test } from '../fixtures/test';
import { VerifyEmailPage } from '../pages/verify-email.page';

const token = 'tok-miriam';
const verification = { email: 'miriam.clarke@example.ca', displayName: 'Miriam Clarke' };

test.describe('Verify email page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-007 AC1 · spinner AC-1, AC-3
  test('opening the link checks it, then asks Miriam to confirm her address', async ({
    page,
    api,
  }) => {
    const release = api.hold('GET', `/auth/email-verifications/${token}`, verification);
    const verify = new VerifyEmailPage(page);

    await verify.open(token);

    await expect(verify.loading).toHaveText('Checking your link…');
    await expect(verify.loading).toHaveAttribute('role', 'status');

    release();

    await expect(verify.heading).toHaveText('Confirm your email');
    await expect(verify.eyebrow).toHaveText('Almost there');
    await expect(verify.sub).toHaveText(
      'Confirm that miriam.clarke@example.ca is yours to finish setting up your Logos Lab account.',
    );
    await expect(verify.confirm).toBeVisible();
    await expect(verify.alt).toHaveText(
      'This link works once, within 24 hours of when we sent it.',
    );
    await expect(verify.shell.minimalAction()).toHaveText('Sign in');
    await expect(page).toHaveTitle('Verify your email - Logos Lab');
  });

  // L2-007 AC1
  test('opening the link does not use it up', async ({ page, api }) => {
    api.respond('GET', `/auth/email-verifications/${token}`, verification);
    const verify = new VerifyEmailPage(page);

    await verify.open(token);
    await expect(verify.confirm).toBeVisible();

    expect(api.requestsTo('POST', '/auth/email-verifications')).toHaveLength(0);
  });
});
