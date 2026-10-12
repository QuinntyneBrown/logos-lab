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
