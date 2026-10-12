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

test.describe('Registering', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  const details = {
    name: 'Miriam Clarke',
    email: 'miriam.clarke@example.ca',
    password: 'quiet-harbour-at-dawn',
    terms: true,
  };

  // L2-006 AC1, AC6
  test('the request carries the details and the button shows progress', async ({ page, api }) => {
    const release = api.hold('POST', '/auth/registrations', undefined, 202);
    const register = new RegisterPage(page);
    await register.open();
    await register.fill(details);

    await register.create();

    await expect(register.submit).toHaveText('Creating your account…');
    await expect(register.submit).toHaveAttribute('aria-busy', 'true');
    expect(api.requestsTo('POST', '/auth/registrations')[0].body).toEqual({
      displayName: 'Miriam Clarke',
      email: 'miriam.clarke@example.ca',
      password: 'quiet-harbour-at-dawn',
      acceptedTerms: true,
      marketingConsent: false,
    });
    release();
    await expect(register.heading).toHaveText('Check your email');
  });

  // L2-006 AC1, AC4 · auth-card AC-7
  test('an accepted registration asks the visitor to check their email', async ({ page, api }) => {
    api.respond('POST', '/auth/registrations', undefined, 202);
    const register = new RegisterPage(page);
    await register.open();
    await register.fill({ ...details, news: true });

    await register.create();

    await expect(register.heading).toHaveText('Check your email');
    await expect(register.heading).toBeFocused();
    await expect(register.sub()).toHaveText(
      'We sent a link to miriam.clarke@example.ca. Open it within 24 hours to finish creating your account.',
    );
    await expect(register.iconTile()).toHaveAttribute('aria-hidden', 'true');
    await expect(register.nextSteps()).toHaveText([
      'The email comes from help@logoslab.ca and can take a few minutes.',
      "Check your spam or promotions folder if it hasn't arrived.",
      'Until you verify, you can browse Logos Lab but not enrol, comment or register for events.',
    ]);
    expect(api.requestsTo('POST', '/auth/registrations')[0].body).toMatchObject({
      marketingConsent: true,
    });
  });

  test('"Start again" returns to an empty form', async ({ page, api }) => {
    api.respond('POST', '/auth/registrations', undefined, 202);
    const register = new RegisterPage(page);
    await register.open();
    await register.fill(details);
    await register.create();

    await register.startAgain().click();

    await expect(register.heading).toHaveText('Create your Logos Lab account');
    await expect(register.email).toHaveValue('');
    await expect(register.terms).not.toBeChecked();
  });
});

test.describe('Registration failures', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  const details = {
    name: 'Miriam Clarke',
    email: 'miriam.clarke@example.ca',
    password: 'quiet-harbour-at-dawn',
    terms: true,
  };

  // L2-006 AC3
  test('a breached password is refused on the field', async ({ page, api }) => {
    api.fail('POST', '/auth/registrations', 422, 'validation-failed', {
      errors: [{ field: 'password', code: 'breached' }],
    });
    const register = new RegisterPage(page);
    await register.open();
    await register.fill(details);

    await register.create();

    await expect(register.summary).toBeFocused();
    await expect(register.summary.getByRole('heading')).toHaveText(
      'One thing to fix before you can create your account',
    );
    await expect(register.errorFor('password')).toHaveText(
      'This password has appeared in a data breach. Choose a different one.',
    );
    await expect(register.password).toHaveAttribute('aria-invalid', 'true');
    await expect(register.submit).toHaveText('Create account');
  });

  // L2-006 AC7
  test('too many attempts pause the form, keep what was typed, then reopen it', async ({
    page,
    api,
  }) => {
    await page.clock.install({ time: new Date('2026-10-11T14:24:00Z') });
    api.fail('POST', '/auth/registrations', 429, 'too-many-requests', {}, { 'Retry-After': '600' });
    const register = new RegisterPage(page);
    await register.open();
    await register.fill(details);

    await register.create();

    await expect(register.alertTitle()).toHaveText('Too many attempts from this connection');
    await expect(register.alert).toHaveAttribute('role', 'status');
    // The locale's own time form in the viewer's zone, zone named; CLDR versions differ on "AM"/"a.m.".
    await expect(register.alert).toContainText(/Try again at 10:34\s(AM|a\.m\.) EDT\./);
    await expect(register.name).toBeDisabled();
    await expect(register.name).toHaveValue('Miriam Clarke');
    await expect(register.terms).toBeDisabled();
    await expect(register.terms).toBeChecked();
    await expect(register.submit).toBeDisabled();

    await page.clock.runFor('10:01');

    await expect(register.alert).toHaveCount(0);
    await expect(register.submit).toBeEnabled();
  });

  test('a server failure says nothing was saved and keeps the form', async ({ page, api }) => {
    api.fail('POST', '/auth/registrations', 500);
    const register = new RegisterPage(page);
    await register.open();
    await register.fill(details);

    await register.create();

    await expect(register.alertTitle()).toHaveText("We couldn't create your account just now");
    await expect(register.alert).toHaveAttribute('role', 'alert');
    await expect(register.email).toHaveValue('miriam.clarke@example.ca');
    await expect(register.submit).toBeEnabled();
  });
});
