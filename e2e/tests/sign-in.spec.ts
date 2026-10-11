import { expect, test } from '../fixtures/test';
import { SignInPage } from '../pages/sign-in.page';

test.describe('Sign in page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-008, L2-127 AC4 · top-bar AC-4, footer AC-2, auth-card AC-1, AC-2
  test('a focused page with a minimal top bar, a quiet footer and the sign-in card', async ({
    page,
  }) => {
    const signIn = new SignInPage(page);
    await signIn.open();

    await expect(page).toHaveTitle('Sign in - Logos Lab');
    await expect(signIn.heading).toHaveText('Sign in to Logos Lab');
    await expect(signIn.shell.primaryNav).toHaveCount(0);
    await expect(signIn.shell.menuButton).toHaveCount(0);
    await expect(signIn.shell.minimalAction()).toHaveText('Create account');
    await expect(signIn.shell.minimalAction()).toHaveAttribute('href', '/register');
    expect(await signIn.shell.footerLinkNames()).toEqual([
      'Privacy',
      'Terms',
      'Accessibility',
      'help@logoslab.ca',
    ]);
    await expect(signIn.shell.footerNote()).toHaveText('Logos Lab · your data is stored in Canada');
    await expect(signIn.forgotPassword).toHaveAttribute('href', '/forgot-password');
    await expect(signIn.createAccount).toHaveAttribute('href', '/register');
  });

  // L2-128 AC1, AC3 · form-field AC-1, text-field AC-6
  test('the fields are labelled, autocomplete and accept paste', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();

    await expect(signIn.email).toHaveAttribute('type', 'email');
    await expect(signIn.email).toHaveAttribute('autocomplete', 'email');
    await expect(signIn.password).toHaveAttribute('type', 'password');
    await expect(signIn.password).toHaveAttribute('autocomplete', 'current-password');

    expect(await signIn.pasteAllowed(signIn.email)).toBe(true);
    expect(await signIn.pasteAllowed(signIn.password)).toBe(true);
  });

  // L2-127 AC2 · button AC-6
  test('"Show" reveals the password and reports its state', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();
    await signIn.password.fill('quiet-harbour-at-dawn');

    await signIn.showPassword.click();

    await expect(signIn.password).toHaveAttribute('type', 'text');
    await expect(signIn.showPassword).toHaveAttribute('aria-pressed', 'true');
    await signIn.showPassword.click();
    await expect(signIn.password).toHaveAttribute('type', 'password');
  });
});
