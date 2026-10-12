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
