import { expect, test } from '../fixtures/test';
import { ResetPasswordPage } from '../pages/reset-password.page';

const token = 'reset-miriam';
const link = { email: 'miriam.clarke@example.ca' };

test.describe('Reset password page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC3 · spinner AC-1, form-field AC-1
  test('opening the link checks it, then asks for a new password', async ({ page, api }) => {
    const release = api.hold('POST', '/auth/password-resets/validations', link);
    const reset = new ResetPasswordPage(page);

    await reset.open(token);

    await expect(reset.loading).toHaveText('Checking your reset link…');
    expect(api.requestsTo('POST', '/auth/password-resets/validations')[0].body).toEqual({ token });
    release();

    await expect(reset.sub).toHaveText(
      "For miriam.clarke@example.ca. When you save it, we'll sign you out everywhere and email you to confirm.",
    );
    await expect(reset.heading).toHaveText('Choose a new password');
    await expect(reset.eyebrow).toHaveText('Reset password');
    await expect(reset.password).toHaveAttribute('type', 'password');
    await expect(reset.password).toHaveAttribute('autocomplete', 'new-password');
    await expect(reset.password).toHaveAccessibleDescription(
      '12 to 128 characters, different from your current one. A short sentence works well.',
    );
    await expect(reset.submit).toHaveText('Save new password');
    await expect(reset.shell.minimalAction()).toHaveText('Sign in');
    await expect(page).toHaveTitle('Choose a new password - Logos Lab');
  });

  // L2-011 AC3 · button AC-6
  test('"Show" reveals the password and says it is pressed', async ({ page, api }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
    const reset = new ResetPasswordPage(page);
    await reset.open(token);
    await reset.password.fill('psalm-eight-under-stars');

    await reset.showPassword.click();

    await expect(reset.password).toHaveAttribute('type', 'text');
    await expect(reset.showPassword).toHaveAttribute('aria-pressed', 'true');
  });

  // L2-011 AC4
  test('an expired, used or tampered link says so and offers a new one', async ({ page, api }) => {
    api.fail('POST', '/auth/password-resets/validations', 410, 'link-invalid');
    const reset = new ResetPasswordPage(page);

    await reset.open(token);

    await expect(reset.heading).toHaveText('This reset link no longer works');
    await expect(reset.sub).toHaveText(
      'Reset links work once, for 60 minutes, and only the newest one you asked for counts. Request a new one and use it straight away.',
    );
    await expect(reset.sendNewLink).toHaveAttribute('href', '/forgot-password');
    await expect(reset.alt).toContainText('Remembered it?');
  });
});

test.describe('Reset password validation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(({ api }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
  });

  // L2-011 AC3, L2-006 · form-layout AC-1, form-field AC-3
  test('a password under 12 characters is refused before saving', async ({ page, api }) => {
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('harbour19');

    await expect(reset.summary).toBeFocused();
    await expect(reset.summary).toContainText('One thing to fix before you can save');
    await expect(reset.passwordError).toHaveText('Use at least 12 characters. This one has 9.');
    await expect(reset.password).toHaveAttribute('aria-invalid', 'true');
    expect(api.requestsTo('POST', '/auth/password-resets/completions')).toHaveLength(0);
  });

  // L2-011 AC3
  test('an empty password asks for one', async ({ page }) => {
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('');

    await expect(reset.passwordError).toHaveText('Enter a new password');
  });
});

test.describe('Saving a new password', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC3 · button AC-4
  test('saving shows a busy button, then confirms and points to sign in', async ({ page, api }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
    const release = api.hold('POST', '/auth/password-resets/completions', undefined, 204);
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('psalm-eight-under-stars');

    await expect(reset.submit).toHaveAttribute('aria-busy', 'true');
    await expect(reset.submit).toHaveText('Saving…');
    expect(api.requestsTo('POST', '/auth/password-resets/completions')[0].body).toEqual({
      token,
      newPassword: 'psalm-eight-under-stars',
    });
    release();

    await expect(reset.heading).toHaveText('Your password is changed');
    await expect(reset.heading).toBeFocused();
    await expect(reset.sub).toHaveText(
      "We've signed you out on every device and emailed miriam.clarke@example.ca to confirm. Sign in with your new password.",
    );
    await expect(reset.signInButton).toHaveAttribute('href', '/sign-in');
    await expect(reset.alt).toContainText("Didn't change it?");
    await expect(reset.alt.getByRole('link')).toHaveAttribute('href', 'mailto:help@logoslab.ca');
  });
});

test.describe('Reset password failures', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-011 AC3, L2-006 · form-field AC-3
  test('a breached password is refused on the field', async ({ page, api }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
    api.fail('POST', '/auth/password-resets/completions', 422, 'validation-failed', {
      errors: [{ field: 'newPassword', code: 'breached' }],
    });
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('password12345');

    await expect(reset.passwordError).toHaveText(
      'This password has appeared in a data breach. Choose a different one.',
    );
    await expect(reset.summary).toBeFocused();
  });

  // L2-011 AC3
  test('the current password is refused on the field', async ({ page, api }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
    api.fail('POST', '/auth/password-resets/completions', 422, 'validation-failed', {
      errors: [{ field: 'newPassword', code: 'same-as-current' }],
    });
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('the old harbour path');

    await expect(reset.passwordError).toHaveText(
      'Choose a password different from your current one.',
    );
  });

  // L2-011 AC4
  test('a link that stops working before saving shows the expired state', async ({ page, api }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
    api.fail('POST', '/auth/password-resets/completions', 410, 'link-invalid');
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('psalm-eight-under-stars');

    await expect(reset.heading).toHaveText('This reset link no longer works');
    await expect(reset.heading).toBeFocused();
  });

  // L2-011 AC3, L2-141 · alert AC-1
  test('a server failure on saving keeps the password and says to try again', async ({
    page,
    api,
  }) => {
    api.respond('POST', '/auth/password-resets/validations', link);
    api.fail('POST', '/auth/password-resets/completions', 503);
    const reset = new ResetPasswordPage(page);
    await reset.open(token);

    await reset.save('psalm-eight-under-stars');

    await expect(reset.alert).toHaveAttribute('role', 'alert');
    await expect(reset.alert).toContainText("We couldn't save your new password");
    await expect(reset.alert).toContainText(
      "Something went wrong on our side and your password hasn't changed. Your link still works for a while, so try again.",
    );
    await expect(reset.password).toHaveValue('psalm-eight-under-stars');
    await expect(reset.submit).toHaveText('Save new password');
  });

  // L2-011 AC4, L2-141
  test('a server failure on checking the link offers to check it again', async ({ page, api }) => {
    api.fail('POST', '/auth/password-resets/validations', 500);
    const reset = new ResetPasswordPage(page);

    await reset.open(token);

    await expect(reset.alert).toContainText("We couldn't check your reset link just now");
    api.respond('POST', '/auth/password-resets/validations', link);
    await reset.tryAgain.click();

    await expect(reset.password).toBeVisible();
  });
});
