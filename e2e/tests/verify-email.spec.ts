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

test.describe('Confirming an email', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('GET', `/auth/email-verifications/${token}`, verification);
  });

  // L2-007 AC1 · spinner AC-1
  test('confirming posts the token, checks it, then welcomes Miriam', async ({ page, api }) => {
    const release = api.hold('POST', '/auth/email-verifications', null, 204);
    const verify = new VerifyEmailPage(page);
    await verify.open(token);

    await verify.confirmEmail();

    await expect(verify.loading).toHaveText('Checking your link…');
    expect(api.requestsTo('POST', '/auth/email-verifications')[0].body).toEqual({ token });

    release();

    await expect(verify.heading).toHaveText('Your email is verified');
    await expect(verify.heading).toBeFocused();
    await expect(verify.sub).toHaveText(
      'Welcome to Logos Lab, Miriam. Your account is active, so you can enrol in courses, comment and register for events.',
    );
    await expect(verify.dashboard).toHaveAttribute('href', '/dashboard');
    await expect(verify.startHere).toHaveAttribute('href', '/collections/start-here-faith-and-ai');
  });
});

test.describe('Expired verification links', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-007 AC2
  test('a link older than 24 hours or already used says so and offers a new one', async ({
    page,
    api,
  }) => {
    api.fail('GET', `/auth/email-verifications/${token}`, 410, 'link-expired', {
      email: 'miriam.clarke@example.ca',
    });
    const verify = new VerifyEmailPage(page);

    await verify.open(token);

    await expect(verify.heading).toHaveText('This link has expired');
    await expect(verify.sub).toHaveText(
      'Verification links work once, within 24 hours. We can send a new one to miriam.clarke@example.ca.',
    );
    await expect(verify.sendNewLink).toBeVisible();
    await expect(verify.alt).toContainText('Already verified?');
    await expect(verify.signIn).toHaveAttribute('href', '/sign-in');
  });

  // L2-007 AC2
  test('a link that expires before it is confirmed shows the expired state', async ({
    page,
    api,
  }) => {
    api.respond('GET', `/auth/email-verifications/${token}`, verification);
    api.fail('POST', '/auth/email-verifications', 410, 'link-expired');
    const verify = new VerifyEmailPage(page);
    await verify.open(token);

    await verify.confirmEmail();

    await expect(verify.heading).toHaveText('This link has expired');
    await expect(verify.heading).toBeFocused();
    await expect(verify.sub).toContainText('miriam.clarke@example.ca');
    await expect(verify.sendNewLink).toBeVisible();
  });

  // L2-007 AC2
  test('an unknown link says it has expired and points to sign in', async ({ page, api }) => {
    api.fail('GET', `/auth/email-verifications/${token}`, 410, 'link-expired');
    const verify = new VerifyEmailPage(page);

    await verify.open(token);

    await expect(verify.heading).toHaveText('This link has expired');
    await expect(verify.sub).toHaveText('Verification links work once, within 24 hours.');
    await expect(verify.sendNewLink).toHaveCount(0);
    await expect(verify.signIn).toBeVisible();
  });
});

test.describe('Sending a new verification link', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page, api }) => {
    await page.clock.install({ time: new Date('2026-10-12T14:24:00Z') });
    api.fail('GET', `/auth/email-verifications/${token}`, 410, 'link-expired', {
      email: 'miriam.clarke@example.ca',
    });
  });

  // L2-007 AC2, AC4 · alert AC-1
  test('a new link is sent, and resending pauses for 60 seconds with the daily limit', async ({
    page,
    api,
  }) => {
    api.respond('POST', '/auth/email-verifications/resend', {
      sentTo: 'miriam.clarke@example.ca',
      retryAfterSeconds: 60,
      remainingToday: 3,
    });
    const verify = new VerifyEmailPage(page);
    await verify.open(token);

    await verify.sendANewLink();

    await expect(verify.heading).toHaveText('We sent a new link');
    expect(api.requestsTo('POST', '/auth/email-verifications/resend')[0].body).toEqual({ token });
    await expect(verify.heading).toBeFocused();
    await expect(verify.sub).toHaveText(
      'Check miriam.clarke@example.ca. The new link works for 24 hours, and earlier links no longer do.',
    );
    await expect(verify.alert).toHaveAttribute('role', 'status');
    await expect(verify.alert).toContainText('Email sent at 10:24');
    await expect(verify.alert).toContainText(
      "It can take a few minutes. Check your spam folder if it hasn't arrived.",
    );
    await expect(verify.resend).toBeDisabled();
    await expect(verify.resend).toHaveText('Resend in 60 s');
    await expect(verify.resendHelp).toHaveText(
      'You can send up to 5 emails a day. You have 3 left today.',
    );
    await expect(verify.resend).toHaveAccessibleDescription(
      'You can send up to 5 emails a day. You have 3 left today.',
    );
    await expect(verify.createAgain).toHaveAttribute('href', '/register');

    await page.clock.runFor(18_000);
    await expect(verify.resend).toHaveText('Resend in 42 s');

    await page.clock.runFor(42_000);
    await expect(verify.resend).toHaveText('Resend email');
    await expect(verify.resend).toBeEnabled();
  });

  // L2-007 AC4
  test('resending within the cooldown waits as long as the server says', async ({ page, api }) => {
    api.respond('POST', '/auth/email-verifications/resend', {
      sentTo: 'miriam.clarke@example.ca',
      retryAfterSeconds: 0,
      remainingToday: 3,
    });
    const verify = new VerifyEmailPage(page);
    await verify.open(token);
    await verify.sendANewLink();
    await expect(verify.resend).toHaveText('Resend email');
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

    await verify.resendEmail();

    await expect(verify.resend).toHaveText('Resend in 42 s');
    await expect(verify.resend).toBeDisabled();
  });
});
