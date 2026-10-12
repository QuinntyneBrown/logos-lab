import { expect, test } from '../fixtures/test';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { SignInPage } from '../pages/sign-in.page';

test.describe('Forgot password page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC1 · auth-card AC-1, form-field AC-1
  test('"Forgot your password?" opens a form that asks for the email', async ({ page }) => {
    const signIn = new SignInPage(page);
    const forgot = new ForgotPasswordPage(page);
    await signIn.open();

    await signIn.forgotPassword.click();

    await expect(page).toHaveURL('/forgot-password');
    await expect(forgot.heading).toHaveText('Reset your password');
    await expect(forgot.eyebrow).toHaveText('Forgot password');
    await expect(forgot.sub).toHaveText(
      "Enter the email you use for Logos Lab and we'll send you a link to choose a new password.",
    );
    await expect(forgot.email).toHaveAttribute('type', 'email');
    await expect(forgot.email).toHaveAttribute('autocomplete', 'email');
    await expect(forgot.email).toHaveAccessibleDescription('The link works for 60 minutes.');
    await expect(forgot.submit).toHaveText('Send reset link');
    await expect(forgot.signIn).toHaveAttribute('href', '/sign-in');
    await expect(forgot.shell.minimalAction()).toHaveText('Create account');
    await expect(page).toHaveTitle('Reset your password - Logos Lab');
  });
});
