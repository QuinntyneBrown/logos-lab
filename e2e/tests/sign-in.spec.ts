import { expect, test } from '../fixtures/test';
import { members } from '../data/members';
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

test.describe('Sign in validation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-128 AC2 · form-layout AC-1, AC-2, form-field AC-2
  test('an invalid submit lists each problem, takes focus and marks the fields', async ({
    page,
    api,
  }) => {
    const signIn = new SignInPage(page);
    await signIn.open();

    await signIn.signIn('miriam.clarke@example', '');

    await expect(signIn.summary).toBeFocused();
    await expect(signIn.summary).toHaveAttribute('role', 'alert');
    await expect(signIn.summary).toContainText('Two things to fix before you can sign in');
    await expect(signIn.summaryLinks()).toHaveText([
      'Enter your email in the form name@example.ca',
      'Enter your password',
    ]);
    await expect(signIn.email).toHaveAttribute('aria-invalid', 'true');
    await expect(signIn.email).toHaveAttribute('aria-describedby', 'email-error');
    await expect(signIn.password).toHaveAttribute('aria-invalid', 'true');
    expect(api.requestsTo('POST', '/auth/sessions')).toHaveLength(0);
  });

  // L2-126 · form-layout AC-3
  test('following an error moves focus to its field', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();
    await signIn.signIn('miriam.clarke@example.ca', '');

    await signIn.summaryLinks().first().click();

    await expect(signIn.password).toBeFocused();
    await expect(signIn.summary).toContainText('One thing to fix before you can sign in');
  });

  // L2-128 AC2
  test('fixing the problems clears the summary on the next submit', async ({ page, api }) => {
    api.hold('POST', '/auth/sessions', { status: 'SignedIn', mfaEnrolmentRequired: false });
    const signIn = new SignInPage(page);
    await signIn.open();
    await signIn.signIn('', '');
    await expect(signIn.summaryLinks()).toHaveText(['Enter your email', 'Enter your password']);

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(signIn.summary).toHaveCount(0);
    await expect(signIn.email).not.toHaveAttribute('aria-invalid', 'true');
  });
});

test.describe('Signing in', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  const signedIn = { status: 'SignedIn', mfaEnrolmentRequired: false };

  // L2-008 · button AC-4, AC-5
  test('while signing in the button is busy and a second press sends nothing', async ({
    page,
    api,
  }) => {
    const release = api.hold('POST', '/auth/sessions', signedIn);
    const signIn = new SignInPage(page);
    await signIn.open();

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(signIn.submit).toHaveText('Signing in…');
    await expect(signIn.submit).toHaveAttribute('aria-busy', 'true');
    await signIn.submitAgain();
    expect(api.requestsTo('POST', '/auth/sessions')).toHaveLength(1);
    expect(api.requestsTo('POST', '/auth/sessions')[0].body).toEqual({
      email: 'miriam.clarke@example.ca',
      password: 'quiet-harbour-at-dawn',
      returnUrl: '/dashboard',
    });
    release();
  });

  // L2-008 AC1
  test('correct details sign the member in and take them to their dashboard', async ({
    page,
    api,
  }) => {
    api.respond('POST', '/auth/sessions', signedIn);
    const signIn = new SignInPage(page);
    await signIn.open();
    api.respond('GET', '/me', members.miriam);

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(page).toHaveURL('/dashboard');
    await expect(signIn.shell.accountButton).toHaveAccessibleName('Your account, Miriam Clarke');
  });

  // L2-008 AC1
  test('a same-site return address brings the member back to where they were', async ({
    page,
    api,
  }) => {
    api.respond('POST', '/auth/sessions', signedIn);
    const signIn = new SignInPage(page);
    await signIn.open('?returnUrl=%2Fcourses%2Fimago-dei-in-an-age-of-machines');

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(page).toHaveURL('/courses/imago-dei-in-an-age-of-machines');
  });

  // L2-008 (ReturnUrlPolicy)
  test('an off-site return address is ignored', async ({ page, api }) => {
    api.respond('POST', '/auth/sessions', signedIn);
    const signIn = new SignInPage(page);
    await signIn.open('?returnUrl=https%3A%2F%2Fevil.example');

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(page).toHaveURL('/dashboard');
    expect(api.requestsTo('POST', '/auth/sessions')[0].body).toMatchObject({
      returnUrl: '/dashboard',
    });
  });

  // L2-014 (second factor)
  test('an account with two-step verification continues to the code step', async ({
    page,
    api,
  }) => {
    api.respond('POST', '/auth/sessions', {
      status: 'SecondFactorRequired',
      mfaEnrolmentRequired: false,
    });
    const signIn = new SignInPage(page);
    await signIn.open('?returnUrl=%2Fsaved');

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(page).toHaveURL('/sign-in/verify?returnUrl=%2Fsaved');
  });
});

test.describe('Sign-in failures', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-008 AC2 · alert AC-1
  test('wrong details say so without saying which, and offer a reset', async ({ page, api }) => {
    api.fail('POST', '/auth/sessions', 401, 'invalid-credentials');
    const signIn = new SignInPage(page);
    await signIn.open();

    await signIn.signIn('miriam.clarke@example.ca', 'not-my-password');

    await expect(signIn.alert).toHaveAttribute('role', 'alert');
    await expect(signIn.alertTitle()).toHaveText('Email or password is incorrect');
    await expect(signIn.alertAction('Reset your password')).toHaveAttribute(
      'href',
      '/forgot-password',
    );
    await expect(signIn.submit).toHaveText('Sign in');
  });

  // L2-009 · alert AC-2
  test('too many attempts pause sign-in until the time the server gives', async ({ page, api }) => {
    await page.clock.setFixedTime(new Date('2026-10-11T14:24:00Z'));
    api.fail('POST', '/auth/sessions', 429, 'too-many-requests', {}, { 'Retry-After': '900' });
    const signIn = new SignInPage(page);
    await signIn.open();

    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');

    await expect(signIn.alertTitle()).toHaveText('Sign-in is paused for 15 minutes');
    await expect(signIn.alert).toContainText('Try again at 10:39 AM EDT.');
    await expect(signIn.email).toBeDisabled();
    await expect(signIn.password).toBeDisabled();
    await expect(signIn.submit).toBeDisabled();
  });

  // L2-009
  test('the form reopens once the pause is over', async ({ page, api }) => {
    await page.clock.install({ time: new Date('2026-10-11T14:24:00Z') });
    api.fail('POST', '/auth/sessions', 429, 'too-many-requests', {}, { 'Retry-After': '900' });
    const signIn = new SignInPage(page);
    await signIn.open();
    await signIn.signIn('miriam.clarke@example.ca', 'quiet-harbour-at-dawn');
    await expect(signIn.submit).toBeDisabled();

    await page.clock.runFor('15:01');

    await expect(signIn.alert).toHaveCount(0);
    await expect(signIn.email).toBeEnabled();
    await expect(signIn.submit).toBeEnabled();
  });

  // L2-019 · alert AC-3
  test('a suspended account sees when the suspension ends and the notice', async ({
    page,
    api,
  }) => {
    api.fail('POST', '/auth/sessions', 403, 'account-suspended', {
      suspendedUntil: '2026-10-20T16:00:00Z',
    });
    const signIn = new SignInPage(page);
    await signIn.open();

    await signIn.signIn('samuel.okafor@example.ca', 'quiet-harbour-at-dawn');

    await expect(signIn.alertTitle()).toHaveText(
      'Your account is suspended until Tue, Oct 20, 2026',
    );
    await expect(signIn.alertAction('Read the notice')).toHaveAttribute('href', '/account-notice');
  });

  // L2-019
  test('an account set to be deleted can be restored', async ({ page, api }) => {
    api.fail('POST', '/auth/sessions', 403, 'account-deactivated', {
      deletionRequestedAt: '2026-10-05T15:00:00Z',
      purgeAt: '2026-11-04T15:00:00Z',
    });
    const signIn = new SignInPage(page);
    await signIn.open();

    await signIn.signIn('peter.lindqvist@example.ca', 'quiet-harbour-at-dawn');

    await expect(signIn.alertTitle()).toHaveText('This account is set to be deleted');
    await expect(signIn.alert).toContainText(
      'You asked us to delete it on Mon, Oct 5, 2026. Until Wed, Nov 4, 2026 you can restore it',
    );
    await expect(signIn.alertAction('Restore your account')).toHaveAttribute(
      'href',
      '/restore-account',
    );
  });
});

test.describe('Why you are at sign-in', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-010 · alert AC-4
  test('after signing out, the page confirms it', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open('?signedOut=true');

    await expect(signIn.alert).toHaveAttribute('role', 'status');
    await expect(signIn.alertTitle()).toHaveText("You're signed out");
    await expect(signIn.alert).toContainText(
      'Your session has ended on this device. On a shared computer, close the browser as well.',
    );
  });

  // L2-010 AC1
  test('after a session expires, the page says why', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open('?reason=session-expired&returnUrl=%2Fsaved');

    await expect(signIn.alert).toHaveAttribute('role', 'status');
    await expect(signIn.alertTitle()).toHaveText('You were signed out after 14 days away');
    await expect(signIn.alert).toContainText(
      "Sign in again and we'll take you back to where you were.",
    );
  });

  test('a plain visit shows no alert', async ({ page }) => {
    const signIn = new SignInPage(page);
    await signIn.open();

    await expect(signIn.alert).toHaveCount(0);
  });
});
