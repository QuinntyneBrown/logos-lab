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
