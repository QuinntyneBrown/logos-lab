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

test.describe('Requesting a reset link', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC1, AC5 · button AC-4
  test('sending shows a busy button, then the same message for any address', async ({
    page,
    api,
  }) => {
    const release = api.hold('POST', '/auth/password-resets', undefined, 202);
    const forgot = new ForgotPasswordPage(page);
    await forgot.open();

    await forgot.requestLink('  miriam.clarke@example.ca ');

    await expect(forgot.submit).toHaveAttribute('aria-busy', 'true');
    await expect(forgot.submit).toHaveText('Sending…');
    release();

    await expect(forgot.heading).toHaveText('Check your email');
    await expect(forgot.heading).toBeFocused();
    await expect(forgot.sub).toHaveText(
      "If an account exists for that address, we've sent a reset link.",
    );
    await expect(forgot.notes).toHaveText([
      'The link works for 60 minutes and only once.',
      'Asking again sends a new link and turns off the old one.',
      'Check your spam folder if nothing arrives in a few minutes.',
    ]);
    await expect(forgot.backToSignIn).toHaveAttribute('href', '/sign-in');
    expect(api.requestsTo('POST', '/auth/password-resets')[0].body).toEqual({
      email: 'miriam.clarke@example.ca',
    });
  });

  // L2-011 AC1
  test('"Use a different email" returns to an empty form', async ({ page, api }) => {
    api.respond('POST', '/auth/password-resets', undefined, 202);
    const forgot = new ForgotPasswordPage(page);
    await forgot.open();
    await forgot.requestLink('miriam.clarke@example.ca');

    await forgot.differentEmail.click();

    await expect(forgot.heading).toHaveText('Reset your password');
    await expect(forgot.email).toHaveValue('');
    await expect(forgot.email).toBeFocused();
  });
});

test.describe('Forgot password failures', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC1, L2-141 · alert AC-1
  test('a server failure keeps the email and says to try again', async ({ page, api }) => {
    api.fail('POST', '/auth/password-resets', 503);
    const forgot = new ForgotPasswordPage(page);
    await forgot.open();

    await forgot.requestLink('miriam.clarke@example.ca');

    await expect(forgot.alert).toHaveAttribute('role', 'alert');
    await expect(forgot.alert).toContainText("We couldn't send a reset link just now");
    await expect(forgot.alert).toContainText(
      'Something went wrong on our side. Try again in a minute; if it keeps happening, write to help@logoslab.ca.',
    );
    await expect(forgot.email).toHaveValue('miriam.clarke@example.ca');
    await expect(forgot.submit).toHaveText('Send reset link');
    await expect(forgot.heading).toHaveText('Reset your password');

    api.respond('POST', '/auth/password-resets', undefined, 202);
    await forgot.submit.click();
    await expect(forgot.heading).toHaveText('Check your email');
  });
});
