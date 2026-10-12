import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { SignInVerifyPage } from '../pages/sign-in-verify.page';

const verifications = '/auth/mfa-challenges/current/verifications';

test.describe('Two-step sign-in page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-014 · text-field AC-15, form-field AC-1
  test('asks for the 6-digit code from the authenticator app', async ({ page }) => {
    const verify = new SignInVerifyPage(page);

    await verify.open('?returnUrl=%2Fsaved');

    await expect(verify.heading).toHaveText('Enter your verification code');
    await expect(verify.eyebrow).toHaveText('Two-step verification');
    await expect(verify.sub).toHaveText(
      'Open your authenticator app and enter the 6-digit code it shows for Logos Lab.',
    );
    await expect(verify.code).toHaveClass(/\botp\b/);
    await expect(verify.code).toHaveAttribute('inputmode', 'numeric');
    await expect(verify.code).toHaveAttribute('autocomplete', 'one-time-code');
    await expect(verify.code).toHaveAttribute('maxlength', '6');
    await expect(verify.code).toHaveAccessibleDescription('Codes change every 30 seconds.');
    await expect(verify.submit).toHaveText('Verify');
    await expect(verify.useRecoveryCode).toBeVisible();
    await expect(verify.differentAccount).toHaveAttribute('href', '/sign-in');
    await expect(verify.shell.minimalAction()).toHaveText('Create account');
    await expect(page).toHaveTitle('Two-step verification - Logos Lab');
  });
});

test.describe('Verifying the second factor', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-014, L2-008 · button AC-4
  test('a right code signs the member in and returns them where they were', async ({
    page,
    api,
  }) => {
    const release = api.hold('POST', verifications, undefined, 204);
    const verify = new SignInVerifyPage(page);
    await verify.open('?returnUrl=%2Fno-such-saved-page');

    await verify.verify('482913');

    await expect(verify.submit).toHaveText('Verifying…');
    await expect(verify.submit).toHaveAttribute('aria-busy', 'true');
    expect(api.requestsTo('POST', verifications)[0].body).toEqual({ code: '482913' });
    api.respond('GET', '/me', members.miriam);
    release();

    await expect(page).toHaveURL('/no-such-saved-page');
    await expect(verify.shell.accountButton).toBeVisible();
  });

  // L2-014
  test('a code that is not 6 digits is refused before sending', async ({ page, api }) => {
    const verify = new SignInVerifyPage(page);
    await verify.open();

    await verify.verify('4829');

    await expect(verify.codeError).toHaveText('Enter the 6-digit code from your app');
    await expect(verify.summary).toBeFocused();
    expect(api.requestsTo('POST', verifications)).toHaveLength(0);
  });
});

test.describe('Signing in with a recovery code', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-014 AC4
  test('"Use a recovery code" swaps the field, and a recovery code signs in', async ({
    page,
    api,
  }) => {
    api.respond('POST', verifications, undefined, 204);
    api.respond('GET', '/me', members.miriam);
    const verify = new SignInVerifyPage(page);
    await verify.open('?returnUrl=%2Fno-such-saved-page');

    await verify.useRecoveryCode.click();

    await expect(verify.heading).toHaveText('Use a recovery code');
    await expect(verify.sub).toHaveText(
      'Enter one of the 10 recovery codes you saved when you set up two-step verification.',
    );
    await expect(verify.recoveryCode).toHaveAccessibleDescription(
      "It looks like 4F7K-29XM. Each code works once, and we'll email you when one is used.",
    );
    await expect(verify.useApp).toBeVisible();

    await verify.verifyRecoveryCode(' 4F7K-29XM ');

    await expect(page).toHaveURL('/no-such-saved-page');
    expect(api.requestsTo('POST', verifications)[0].body).toEqual({ recoveryCode: '4F7K-29XM' });
  });

  // L2-014
  test('the app code comes back with "Use your authenticator app instead"', async ({ page }) => {
    const verify = new SignInVerifyPage(page);
    await verify.open('?method=recovery');

    await verify.useApp.click();

    await expect(verify.heading).toHaveText('Enter your verification code');
    await expect(verify.code).toBeVisible();
  });

  // L2-014
  test('an empty recovery code asks for one', async ({ page }) => {
    const verify = new SignInVerifyPage(page);
    await verify.open('?method=recovery');

    await verify.verifyRecoveryCode('');

    await expect(verify.recoveryError).toHaveText('Enter a recovery code');
  });
});

test.describe('Two-step sign-in failures', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-014 AC3 · form-field AC-3
  test('a wrong code says how many tries are left', async ({ page, api }) => {
    api.fail('POST', verifications, 401, 'invalid-code', { attemptsLeft: 3 });
    const verify = new SignInVerifyPage(page);
    await verify.open();

    await verify.verify('482931');

    const message =
      "That code doesn't match. Enter the newest code from your app; you have 3 tries left before a 15-minute pause.";
    await expect(verify.codeError).toHaveText(message);
    await expect(verify.summary).toBeFocused();
    await expect(verify.summary.getByRole('link')).toHaveText(message);
    await expect(verify.submit).toHaveText('Verify');
  });

  // L2-014 AC4
  test('a wrong or used recovery code is refused on the field', async ({ page, api }) => {
    api.fail('POST', verifications, 401, 'invalid-code', { attemptsLeft: 4 });
    const verify = new SignInVerifyPage(page);
    await verify.open('?method=recovery');

    await verify.verifyRecoveryCode('4F7K-29XM');

    await expect(verify.recoveryError).toHaveText(
      "That recovery code doesn't match or has been used. Check it and try again.",
    );
  });

  // L2-014 AC3 · alert AC-1
  test('five wrong codes pause the step until the time the server gives', async ({ page, api }) => {
    await page.clock.install({ time: new Date('2026-10-12T14:24:00Z') });
    api.fail('POST', verifications, 429, 'too-many-requests', {}, { 'Retry-After': '900' });
    const verify = new SignInVerifyPage(page);
    await verify.open();

    await verify.verify('482931');

    await expect(verify.alert).toHaveAttribute('role', 'status');
    await expect(verify.alert).toContainText('Verification is paused for 15 minutes');
    await expect(verify.alert).toContainText('Try again at 10:39');
    await expect(verify.alert.getByRole('link')).toHaveAttribute('href', 'mailto:help@logoslab.ca');
    await expect(verify.code).toBeDisabled();
    await expect(verify.submit).toBeDisabled();

    await page.clock.runFor(900_000);
    await expect(verify.code).toBeEnabled();
    await expect(verify.alert).toHaveCount(0);
  });

  // L2-014, L2-141 · alert AC-1
  test('a server failure keeps the code and asks for a fresh one', async ({ page, api }) => {
    api.fail('POST', verifications, 503);
    const verify = new SignInVerifyPage(page);
    await verify.open();

    await verify.verify('482913');

    await expect(verify.alert).toHaveAttribute('role', 'alert');
    await expect(verify.alert).toContainText("We couldn't check your code");
    await expect(verify.alert).toContainText(
      'Something went wrong on our side. Enter the newest code from your app and try again.',
    );
    await expect(verify.code).toHaveValue('482913');
  });
});
