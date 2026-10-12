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
