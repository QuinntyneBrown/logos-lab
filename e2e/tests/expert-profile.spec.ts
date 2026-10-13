import { abenaMensah, expertArticles, expertContent, meiLinChen } from '../data/expert-profiles';
import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { ExpertProfilePage } from '../pages/expert-profile.page';
import { SignInRequiredDialog } from '../pages/sign-in-required.dialog';
import { UnfollowDialog } from '../pages/unfollow.dialog';

test.describe('Expert profile', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-021 AC1 · profile-header AC-1, breadcrumb AC-1
  test('shows who the expert is: photo, name, title, facts and breadcrumb', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(page).toHaveTitle('Dr. Abena Mensah - Logos Lab');
    await expect(profile.breadcrumb.getByRole('link', { name: 'Experts' })).toHaveAttribute(
      'href',
      '/experts',
    );
    await expect(profile.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'Dr. Abena Mensah',
    );
    await expect(profile.heading).toHaveText('Dr. Abena Mensah');
    await expect(profile.photo).toHaveAttribute('alt', 'Dr. Abena Mensah');
    await expect(profile.subline).toHaveText(
      'Associate Professor of Systematic Theology, Kingsgate Theological College',
    );
    await expect(profile.facts).toHaveText(['1,284 followers', '7 published items']);
  });

  // L2-021 AC2, AC3 · prose AC-1, card AC-1, list AC-1
  test('shows the bio, the areas of expertise and the external links', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.bio).toContainText('Abena Mensah is a theologian who writes about');
    await expect(profile.bio).toContainText('Made, Not Manufactured');
    await expect(profile.bio.locator('em')).toHaveText('theological anthropology');
    expect(await profile.bioScriptRan()).toBe(false);
    await expect(profile.expertise.getByRole('link')).toHaveText([
      'The image of God and personhood',
      'Theology of technology',
      'Formation and education',
    ]);
    await expect(profile.expertise.getByRole('link').first()).toHaveAttribute(
      'href',
      '/topics/the-image-of-god-and-personhood',
    );
    const faculty = profile.elsewhere.getByRole('link', { name: /^Faculty page/ });
    await expect(faculty).toHaveAttribute('href', 'https://kingsgate.example.ca/faculty/mensah');
    await expect(faculty).toHaveAttribute('target', '_blank');
    await expect(faculty).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(faculty).toHaveAccessibleName('Faculty page (external site, opens in a new tab)');
  });

  // L2-021 AC4 · tabs AC-10, AC-13
  test('the published items are in tabs, one for each type, each with its count', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.tabs).toHaveText([
      'Courses 1',
      'Videos 1',
      'Articles 3',
      'Collections 1',
      'Events 1',
    ]);
    await expect(profile.tab('Courses')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.tab('Videos')).toHaveAttribute('aria-selected', 'false');
    await expect(profile.cards).toHaveCount(1);
    await expect(profile.panel).toHaveAccessibleName('Courses 1');
  });

  // L2-021 AC4 · tabs AC-13
  test('choosing a tab shows that type and keeps focus on the tab', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=article', expertArticles());
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');

    await profile.tab('Articles').click();

    await expect(page).toHaveURL('/experts/abena-mensah?type=article');
    await expect(profile.tab('Articles')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.cards).toHaveCount(3);
    await expect(profile.panel).toHaveAccessibleName('Articles 3');
    await expect(profile.tab('Articles')).toBeFocused();
  });

  // L2-126 · tabs AC-19, AC-20
  test('arrow keys move through the tabs and open each one', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=video', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=event', expertContent());
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');
    await profile.tab('Courses').focus();

    await profile.pressKey('ArrowRight');
    await expect(profile.tab('Videos')).toBeFocused();
    await expect(profile.tab('Videos')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.tab('Courses')).toHaveAttribute('tabindex', '-1');

    await profile.pressKey('End');
    await expect(profile.tab('Events')).toBeFocused();
    await expect(profile.tab('Events')).toHaveAttribute('aria-selected', 'true');

    await profile.pressKey('ArrowRight');
    await expect(profile.tab('Courses')).toBeFocused();

    await profile.pressKey('ArrowLeft');
    await expect(profile.tab('Events')).toBeFocused();
  });

  // L2-021 AC4 · tabs AC-10
  test('an address with a type opens that tab, and an unknown type is ignored', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('GET', '/experts/abena-mensah/content?type=article', expertArticles());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah?type=article');
    await expect(profile.tab('Articles')).toHaveAttribute('aria-selected', 'true');
    await expect(profile.cards).toHaveCount(3);

    await profile.open('/experts/abena-mensah?type=podcast');
    await expect(profile.tab('Courses')).toHaveAttribute('aria-selected', 'true');
  });

  // L2-127 AC3 · skeleton AC-1, profile-header AC-14
  test('while the profile loads, the page is busy and announces it once', async ({ page, api }) => {
    const release = api.hold('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.heading).toHaveText('Loading profile…');
    await expect(profile.skeletonCards).toHaveCount(3);
    await expect(
      profile.loadingMessages.filter({ hasText: 'Loading published content…' }),
    ).toHaveCount(1);

    release();

    await expect(profile.heading).toHaveText('Dr. Abena Mensah');
    await expect(profile.skeletonCards).toHaveCount(0);
    await expect(profile.cards).toHaveCount(1);
  });

  // L2-021 AC4 · empty-state AC-1
  test('an expert with nothing published says so in place of the tabs', async ({ page, api }) => {
    api.respond('GET', '/experts/mei-lin-chen', meiLinChen);
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/mei-lin-chen');

    await expect(profile.heading).toHaveText('Dr. Mei Lin Chen');
    await expect(profile.tabs).toHaveCount(0);
    await expect(profile.emptyTitle).toHaveText('Nothing published yet');
    await expect(profile.emptyState).toContainText('Dr. Mei Lin Chen is new to Logos Lab.');
  });

  // L2-141 AC2 · empty-state AC-2
  test('a profile that fails to load offers another try', async ({ page, api }) => {
    api.fail('GET', '/experts/abena-mensah', 500);
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.emptyTitle).toHaveText("We couldn't load this profile");
    await expect(profile.breadcrumb.locator('[aria-current="page"]')).toHaveText('Expert');

    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    await profile.tryAgain.click();

    await expect(profile.heading).toHaveText('Dr. Abena Mensah');
    await expect(profile.cards).toHaveCount(1);
  });

  // L2-021 AC5 · error-page AC-1
  test('a slug that is not an expert shows the not-found page', async ({ page, api }) => {
    api.fail('GET', '/experts/nobody', 404, 'not-found');
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/nobody');

    await expect(profile.heading).toHaveText("We can't find that page");
    await expect(page).toHaveTitle('Page not found - Logos Lab');
  });

  // L2-141 AC2 · empty-state AC-2
  test('items that fail to load keep the tabs and offer another try', async ({ page, api }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.fail('GET', '/experts/abena-mensah/content?type=course', 500);
    const profile = new ExpertProfilePage(page);

    await profile.open('/experts/abena-mensah');

    await expect(profile.tabs).toHaveCount(5);
    await expect(profile.emptyTitle).toHaveText("We couldn't load these items");

    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    await profile.tryAgain.click();

    await expect(profile.cards).toHaveCount(1);
  });

  // L2-024 AC1 · button AC-1, inline-message AC-1
  test('a member who presses Follow is following and the count goes up by one', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('PUT', '/me/follows/experts/e-abena-mensah', { followerCount: 1285 });
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');
    await expect(profile.follow).toHaveAttribute('aria-pressed', 'false');
    await expect(profile.follow).toHaveText('Follow');

    await profile.follow.click();

    await expect(profile.follow).toHaveText('Following');
    await expect(profile.follow).toHaveAttribute('aria-pressed', 'true');
    await expect(profile.facts.first()).toHaveText('1,285 followers');
    await expect(profile.followStatus).toHaveText(
      "Following. You'll hear when Dr. Abena Mensah publishes or announces an event.",
    );
    expect(api.requestsTo('PUT', '/me/follows/experts/e-abena-mensah')).toHaveLength(1);
  });

  // L2-141 AC2 · alert AC-1
  test('a follow that fails says so, keeps Follow, and can be tried again', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.fail('PUT', '/me/follows/experts/e-abena-mensah', 500);
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');

    await profile.follow.click();

    await expect(profile.followAlertTitle).toHaveText("We couldn't follow just now");
    await expect(profile.follow).toHaveText('Follow');
    await expect(profile.follow).toHaveAttribute('aria-pressed', 'false');
    await expect(profile.facts.first()).toHaveText('1,284 followers');

    api.respond('PUT', '/me/follows/experts/e-abena-mensah', { followerCount: 1285 });
    await profile.follow.click();

    await expect(profile.follow).toHaveText('Following');
    await expect(profile.followAlert).toHaveCount(0);
  });

  // L2-024 AC4 · button AC-16, AC-17, alert AC-1
  test('after too many follows the button is paused until the time given', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.fail(
      'PUT',
      '/me/follows/experts/e-abena-mensah',
      429,
      'rate_limited',
      {},
      {
        'Retry-After': '90',
      },
    );
    const profile = new ExpertProfilePage(page);
    await profile.open('/experts/abena-mensah');

    await profile.follow.click();

    await expect(profile.followAlertTitle).toHaveText('Give it a minute');
    await expect(profile.followAlert).toContainText(
      "You've followed and unfollowed Dr. Abena Mensah more than 10 times in a minute, so Follow is paused. You can try again at",
    );
    await expect(profile.follow).toHaveAttribute('aria-disabled', 'true');
    await expect(profile.follow).toHaveAttribute('aria-pressed', 'false');
    await expect(profile.follow).toHaveAccessibleDescription(/^Give it a minute/);

    expect(api.requestsTo('PUT', '/me/follows/experts/e-abena-mensah')).toHaveLength(1);
    await profile.follow.focus();
    await profile.pressKey('Enter');
    expect(api.requestsTo('PUT', '/me/follows/experts/e-abena-mensah')).toHaveLength(1);
    await profile.pressKey('Space');
    await expect(profile.follow).toBeFocused();

    expect(api.requestsTo('PUT', '/me/follows/experts/e-abena-mensah')).toHaveLength(1);
  });

  // L2-015 AC1 · dialog AC-1
  test('a visitor who presses Follow is asked to sign in and sent nothing', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/experts/abena-mensah', abenaMensah);
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);
    const prompt = new SignInRequiredDialog(page);
    await profile.open('/experts/abena-mensah');

    await profile.follow.click();

    await expect(prompt.title).toHaveText('Sign in to follow Dr. Abena Mensah');
    await expect(prompt.dialog).toHaveAccessibleDescription(/^Following is free\./);
    await expect(prompt.signIn).toHaveAttribute(
      'href',
      '/sign-in?returnUrl=%2Fexperts%2Fabena-mensah',
    );
    await expect(prompt.createAccount).toHaveAttribute(
      'href',
      '/register?returnUrl=%2Fexperts%2Fabena-mensah',
    );
    expect(api.requestsTo('PUT', '/me/follows/experts/e-abena-mensah')).toHaveLength(0);

    await prompt.close.click();

    await expect(prompt.dialog).toHaveCount(0);
    await expect(profile.follow).toBeFocused();
    await expect(profile.follow).toHaveText('Follow');
  });

  // L2-024 AC3 · dialog AC-2
  test('pressing Following asks first, and Keep following leaves the follow alone', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', { ...abenaMensah, following: true });
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const profile = new ExpertProfilePage(page);
    const unfollow = new UnfollowDialog(page);
    await profile.open('/experts/abena-mensah');
    await expect(profile.follow).toHaveText('Following');
    await expect(profile.follow).toHaveAttribute('aria-pressed', 'true');

    await profile.follow.click();

    await expect(unfollow.title).toHaveText('Unfollow Dr. Abena Mensah?');
    await expect(unfollow.dialog).toHaveAccessibleDescription(
      "You'll stop getting notifications when Dr. Abena Mensah publishes or announces an event. You can follow again at any time.",
    );
    await expect(unfollow.keepFollowing).toBeFocused();

    await unfollow.keepFollowing.click();

    await expect(unfollow.dialog).toHaveCount(0);
    await expect(profile.follow).toBeFocused();
    await expect(profile.follow).toHaveText('Following');
    expect(api.requestsTo('DELETE', '/me/follows/experts/e-abena-mensah')).toHaveLength(0);
  });

  // L2-024 AC3 · dialog AC-2
  test('confirming Unfollow stops the follow and the count goes down by one', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', {
      ...abenaMensah,
      following: true,
      followerCount: 1285,
    });
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.respond('DELETE', '/me/follows/experts/e-abena-mensah', { followerCount: 1284 });
    const profile = new ExpertProfilePage(page);
    const unfollow = new UnfollowDialog(page);
    await profile.open('/experts/abena-mensah');
    await profile.follow.click();

    await unfollow.unfollow.click();

    await expect(unfollow.dialog).toHaveCount(0);
    await expect(profile.follow).toHaveText('Follow');
    await expect(profile.follow).toHaveAttribute('aria-pressed', 'false');
    await expect(profile.follow).toBeFocused();
    await expect(profile.facts.first()).toHaveText('1,284 followers');
    await expect(profile.followStatus).toHaveText('Unfollowed. You can follow again at any time.');
  });

  // L2-127 AC3 · dialog AC-3
  test('while Unfollow is sent the dialog is busy and cannot be dismissed', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', { ...abenaMensah, following: true });
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    const release = api.hold('DELETE', '/me/follows/experts/e-abena-mensah', {
      followerCount: 1283,
    });
    const profile = new ExpertProfilePage(page);
    const unfollow = new UnfollowDialog(page);
    await profile.open('/experts/abena-mensah');
    await profile.follow.click();

    await unfollow.unfollow.click();

    await expect(unfollow.unfollow).toHaveText('Unfollowing…');
    await expect(unfollow.unfollow).toHaveAttribute('aria-busy', 'true');
    await expect(unfollow.keepFollowing).toBeDisabled();
    await expect(unfollow.close).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(unfollow.dialog).toBeVisible();

    release();

    await expect(unfollow.dialog).toHaveCount(0);
  });

  // L2-141 AC2 · dialog AC-4, alert AC-1
  test('an unfollow that fails keeps the dialog open and offers another try', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/experts/abena-mensah', { ...abenaMensah, following: true });
    api.respond('GET', '/experts/abena-mensah/content?type=course', expertContent());
    api.fail('DELETE', '/me/follows/experts/e-abena-mensah', 500);
    const profile = new ExpertProfilePage(page);
    const unfollow = new UnfollowDialog(page);
    await profile.open('/experts/abena-mensah');
    await profile.follow.click();

    await unfollow.unfollow.click();

    await expect(unfollow.alertTitle).toHaveText("We couldn't unfollow just now");
    await expect(unfollow.alert).toContainText(
      "You're still following Dr. Abena Mensah. Check your connection and try again.",
    );
    await expect(unfollow.tryAgain).toBeVisible();

    api.respond('DELETE', '/me/follows/experts/e-abena-mensah', { followerCount: 1283 });
    await unfollow.tryAgain.click();

    await expect(unfollow.dialog).toHaveCount(0);
    await expect(profile.follow).toHaveText('Follow');
  });
});
