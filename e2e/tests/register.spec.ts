import { expect, test } from '../fixtures/test';
import { RegisterPage } from '../pages/register.page';

test.describe('Register page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-006 · auth-card, checkbox AC-1
  test('a focused page with the registration card', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.open();

    await expect(page).toHaveTitle('Create account - Logos Lab');
    await expect(register.heading).toHaveText('Create your Logos Lab account');
    await expect(register.shell.minimalAction()).toHaveText('Sign in');
    await expect(register.shell.minimalAction()).toHaveAttribute('href', '/sign-in');
    await expect(register.signIn).toHaveAttribute('href', '/sign-in');
    await expect(register.terms).not.toBeChecked();
    await expect(register.news).not.toBeChecked();
    await expect(register.submit).toHaveText('Create account');
  });

  // L2-006 · form-field AC-9, AC-11, checkbox AC-5
  test('the rules are stated up front and tied to their controls', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.open();

    await expect(register.helpFor('name')).toHaveText(
      'Shown on your comments and certificates. 2 to 50 characters.',
    );
    expect(await register.helpComesBefore(register.name)).toBe(true);
    expect(await register.describedBy(register.name)).toBe('name-help');
    await expect(register.helpFor('password')).toHaveText(
      "12 to 128 characters. A short sentence you'll remember works well.",
    );
    expect(await register.describedBy(register.password)).toBe('password-help');
    await expect(register.password).toHaveAttribute('autocomplete', 'new-password');
    await expect(register.helpLink('terms', 'Terms of Use')).toHaveAttribute(
      'href',
      '/policies/terms',
    );
    await expect(register.helpLink('terms', 'Privacy Policy')).toHaveAttribute(
      'href',
      '/policies/privacy',
    );
    expect(await register.describedBy(register.terms)).toBe('terms-help');
    expect(await register.describedBy(register.news)).toBe('news-desc');
  });

  // checkbox AC-2, AC-3
  test('the terms box toggles from its text and from the keyboard', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.open();

    await page.getByText('I accept the Terms of Use and the Privacy Policy').click();
    await expect(register.terms).toBeChecked();
    await register.terms.press('Space');
    await expect(register.terms).not.toBeChecked();
  });
});

test.describe('Register validation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-006 AC2, AC5 · form-layout AC-1, AC-2, checkbox AC-4, form-field AC-10
  test('a short name, a short password and unaccepted terms are listed and marked', async ({
    page,
    api,
  }) => {
    const register = new RegisterPage(page);
    await register.open();
    await register.fill({ name: 'M', email: 'miriam.clarke@example.ca', password: 'harbour1' });

    await register.create();

    await expect(register.summary).toBeFocused();
    await expect(register.summary.getByRole('heading')).toHaveText(
      'Three things to fix before you can create your account',
    );
    await expect(register.summaryLinks()).toHaveText([
      'Enter a name of 2 to 50 characters',
      'Use at least 12 characters. This one has 8.',
      'Accept the Terms of Use and the Privacy Policy to create an account',
    ]);
    await expect(register.terms).toHaveAttribute('aria-invalid', 'true');
    expect(await register.describedBy(register.terms)).toBe('terms-help terms-error');
    await expect(register.errorFor('password')).toHaveText(
      'Use at least 12 characters. This one has 8.',
    );
    await expect(register.email).not.toHaveAttribute('aria-invalid', 'true');
    expect(api.requestsTo('POST', '/auth/registrations')).toHaveLength(0);
  });

  // L2-006 AC2, AC6
  test('an unchecked news box does not block, and fixing the form clears the summary', async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.open();
    await register.fill({ name: 'Miriam Clarke', email: 'miriam', password: 'harbour1' });
    await register.create();
    await expect(register.summaryLinks()).toHaveText([
      'Enter your email in the form name@example.ca',
      'Use at least 12 characters. This one has 8.',
      'Accept the Terms of Use and the Privacy Policy to create an account',
    ]);

    await register.fill({
      email: 'miriam.clarke@example.ca',
      password: 'quiet-harbour-at-dawn',
      terms: true,
    });
    await register.create();

    await expect(register.summary).toHaveCount(0);
  });
});
