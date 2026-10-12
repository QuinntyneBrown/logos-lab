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

test.describe('Forgot password validation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC1 · form-layout AC-1, form-field AC-3
  test('a malformed email is refused before sending, with a summary', async ({ page, api }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.open();

    await forgot.requestLink('miriam.clarke@example');

    await expect(forgot.summary).toBeFocused();
    await expect(forgot.summary).toContainText('One thing to fix before we can send a link');
    await expect(forgot.summary.getByRole('link')).toHaveText(
      'Enter your email in the form name@example.ca',
    );
    await expect(forgot.emailError).toHaveText('Enter your email in the form name@example.ca');
    await expect(forgot.email).toHaveAttribute('aria-invalid', 'true');
    await expect(forgot.email).toHaveValue('miriam.clarke@example');
    expect(api.requestsTo('POST', '/auth/password-resets')).toHaveLength(0);
  });

  // L2-011 AC1
  test('an empty email asks for one', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.open();

    await forgot.requestLink('');

    await expect(forgot.emailError).toHaveText('Enter your email');
  });
});
