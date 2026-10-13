import { completedState, enrolledAt42, imagoDeiCourse, notEnrolled } from '../data/courses';
import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { CourseOverviewPage } from '../pages/course-overview.page';
import { LeaveCourseDialog } from '../pages/leave-course.dialog';
import { VerifyEmailPromptDialog } from '../pages/verify-email-prompt.dialog';

const path = '/courses/imago-dei-in-an-age-of-machines';

test.describe('Course overview', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-025 AC1 · hero AC-1, breadcrumb AC-1
  test('shows the title, summary, contributors and what you will learn', async ({ page, api }) => {
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(page).toHaveTitle('Imago Dei in an Age of Machines - Logos Lab');
    await expect(course.breadcrumb.getByRole('link', { name: 'Courses' })).toHaveAttribute(
      'href',
      '/explore?type=course',
    );
    await expect(course.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'Imago Dei in an Age of Machines',
    );
    await expect(course.eyebrow).toHaveText('Course · Dr. Abena Mensah');
    await expect(course.heading).toHaveText('Imago Dei in an Age of Machines');
    await expect(course.summary).toHaveText(imagoDeiCourse.summary);
    await expect(course.outcomes).toHaveText(imagoDeiCourse.outcomes);
  });

  // L2-025 AC1, AC2 · course-outline AC-1
  test('shows the syllabus with every lesson locked for a visitor', async ({ page, api }) => {
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.contentSummary).toHaveText(
      '6 sections · 24 lessons · about 5 h 40 min. Sign in and enrol to open the lessons; they open in order.',
    );
    expect(await course.sectionSummaries()).toEqual([
      '1. Beginnings4 lessons',
      '2. Made, not manufactured5 lessons',
      '3. Image and likeness5 lessons',
      '4. Minds and machines4 lessons',
      '5. Vocation and dominion3 lessons',
      '6. Hope and limits3 lessons',
    ]);
    await expect(course.lessons).toHaveCount(24);
    await expect(course.lessons.first()).toHaveAttribute('aria-disabled', 'true');
    await expect(course.lessons.first()).toContainText('1.1 Why this course');
    await expect(course.lessons.first()).toContainText('Video · 6 min');
    await expect(course.lessons.first()).toContainText('locked: sign in and enrol to open');
    await expect(course.outline.getByRole('link')).toHaveCount(0);
  });

  // L2-025 AC1 · card AC-1, description-list AC-3, chip AC-1
  test('names who teaches it, the facts about it and its topics', async ({ page, api }) => {
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.taughtBy.getByRole('link')).toHaveText('Dr. Abena Mensah');
    await expect(course.taughtBy.getByRole('link')).toHaveAttribute(
      'href',
      '/experts/abena-mensah',
    );
    await expect(course.facts).toHaveText([
      'Lessons24 in 6 sections',
      'LengthAbout 5 h 40 min',
      'LevelIntermediate',
      'OrderIn sequence',
      'Learners1,284 enrolled',
    ]);
    await expect(course.topics.getByRole('link')).toHaveText([
      'The image of God and personhood',
      'Theology of technology',
      'Philosophy of mind',
    ]);
    await expect(course.topics.getByRole('link').first()).toHaveAttribute(
      'href',
      '/topics/the-image-of-god-and-personhood',
    );
    await expect(course.talk).toContainText('41 comments');
  });

  // L2-025 AC2 · L2-015 AC1 · hero AC-2
  test('a visitor is offered to sign in or create an account, returning to the course', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.signIn).toHaveText('Sign in to enrol');
    await expect(course.signIn).toHaveAttribute(
      'href',
      '/sign-in?returnUrl=%2Fcourses%2Fimago-dei-in-an-age-of-machines',
    );
    await expect(course.createAccount).toHaveText('Create a free account');
    await expect(course.createAccount).toHaveAttribute(
      'href',
      '/register?returnUrl=%2Fcourses%2Fimago-dei-in-an-age-of-machines',
    );
    await expect(course.enrol).toHaveCount(0);
  });

  // L2-027 AC1 · button AC-4
  test('a verified member who presses Enrol is enrolled and taken to the first lesson', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    const release = api.hold(
      'POST',
      '/courses/imago-dei-in-an-age-of-machines/enrolment',
      { firstLessonId: 'l1-1' },
      201,
    );
    const course = new CourseOverviewPage(page);
    await course.open(path);
    await expect(course.contentSummary).toContainText(
      'Enrol to open the lessons; they open in order.',
    );

    await course.enrol.click();

    await expect(course.enrolling).toHaveText('Enrolling…');
    await expect(course.enrolling).toHaveAttribute('aria-busy', 'true');

    release();

    await expect(page).toHaveURL(`${path}/lessons/l1-1`);
  });

  // L2-141 AC2 · alert AC-1
  test('an enrolment that fails says so and leaves Enrol available', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    api.fail('POST', '/courses/imago-dei-in-an-age-of-machines/enrolment', 500);
    const course = new CourseOverviewPage(page);
    await course.open(path);

    await course.enrol.click();

    await expect(course.enrolAlertTitle).toHaveText("We couldn't enrol you just now");
    await expect(course.enrol).toBeVisible();
    await expect(page).toHaveURL(path);
  });

  // L2-027 AC4 · L2-007 · dialog AC-1
  test('an unverified member who presses Enrol is asked to verify their email, and nothing is sent', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.ethan);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    const course = new CourseOverviewPage(page);
    const prompt = new VerifyEmailPromptDialog(page);
    await course.open(path);

    await course.enrol.click();

    await expect(prompt.title).toHaveText('Verify your email to enrol');
    await expect(prompt.dialog).toHaveAccessibleDescription(
      /^We sent a link to ethan\.wu@example\.ca when you joined\./,
    );
    await expect(prompt.changeAddress).toHaveAttribute('href', '/settings/account');
    await expect(prompt.footer.getByRole('button')).toHaveText(['Not now', 'Resend email']);
    expect(
      api.requestsTo('POST', '/courses/imago-dei-in-an-age-of-machines/enrolment'),
    ).toHaveLength(0);

    await prompt.notNow.click();

    await expect(prompt.dialog).toHaveCount(0);
    await expect(course.enrol).toBeFocused();
  });

  // L2-027 AC4 · L2-007
  test('the server refusing an unverified email opens the same prompt', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    api.fail('POST', '/courses/imago-dei-in-an-age-of-machines/enrolment', 403, 'email-unverified');
    const course = new CourseOverviewPage(page);
    const prompt = new VerifyEmailPromptDialog(page);
    await course.open(path);

    await course.enrol.click();

    await expect(prompt.title).toHaveText('Verify your email to enrol');
    await expect(course.enrolAlertTitle).toHaveCount(0);
  });

  // L2-007 · dialog AC-9
  test('Resend email sends a new link and says where, then waits before another', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.ethan);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    const release = api.hold('POST', '/auth/email-verifications/resend', {
      sentTo: 'ethan.wu@example.ca',
      retryAfterSeconds: 60,
      remainingToday: 4,
    });
    const course = new CourseOverviewPage(page);
    const prompt = new VerifyEmailPromptDialog(page);
    await course.open(path);
    await course.enrol.click();

    await prompt.resend.click();

    await expect(prompt.sending).toHaveText('Sending…');
    await expect(prompt.sending).toHaveAttribute('aria-busy', 'true');

    release();

    await expect(prompt.title).toHaveText('Check your inbox');
    await expect(prompt.dialog).toHaveAccessibleDescription(
      /^We sent a new link to ethan\.wu@example\.ca\. It works for 24 hours\./,
    );
    await expect(prompt.resend).toHaveText(/^Resend in \d+ s$/);
    await expect(prompt.resend).toBeDisabled();
    await expect(prompt.back).toHaveText('Back to the course');
  });

  // L2-007 · dialog AC-9
  test('a resend asked for too soon waits for the time the server gives', async ({ page, api }) => {
    api.respond('GET', '/me', members.ethan);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    api.fail(
      'POST',
      '/auth/email-verifications/resend',
      429,
      'rate_limited',
      {},
      {
        'Retry-After': '42',
      },
    );
    const course = new CourseOverviewPage(page);
    const prompt = new VerifyEmailPromptDialog(page);
    await course.open(path);
    await course.enrol.click();

    await prompt.resend.click();

    await expect(prompt.resend).toHaveText(/^Resend in (4[0-2]|3\d) s$/);
    await expect(prompt.resend).toBeDisabled();
    await expect(prompt.title).toHaveText('Verify your email to enrol');
  });

  // L2-007 · dialog AC-10
  test('after five emails in a day the prompt says so and keeps the last link working', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.ethan);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    api.fail(
      'POST',
      '/auth/email-verifications/resend',
      429,
      'rate_limited',
      {},
      {
        'Retry-After': '80000',
      },
    );
    const course = new CourseOverviewPage(page);
    const prompt = new VerifyEmailPromptDialog(page);
    await course.open(path);
    await course.enrol.click();

    await prompt.resend.click();

    await expect(prompt.alertTitle).toHaveText('That’s 5 emails today, the daily limit');
    await expect(prompt.alert).toContainText('The most recent link still works until');
    await expect(prompt.resend).toBeDisabled();
    await expect(prompt.back).toHaveText('Back to the course');
  });

  // L2-025 AC3 · progress-bar AC-1, hero AC-3
  test('an enrolled learner sees their progress and Continue to the next lesson', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', enrolledAt42);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.progressBar).toHaveAttribute('aria-valuenow', '42');
    await expect(course.progressBar).toHaveAccessibleName('Your progress');
    await expect(course.progressValue).toHaveText('42%');
    await expect(course.progressHelp).toHaveText(
      '10 of 24 lessons · next up: 3.2 Representing, not resembling, about 14 minutes',
    );
    await expect(course.continueLink).toHaveAttribute('href', `${path}/lessons/l3-2`);
    await expect(course.continueLink).toHaveAccessibleName(
      'Continue: 3.2 Representing, not resembling',
    );
    await expect(course.leave).toBeVisible();
    await expect(course.enrol).toHaveCount(0);
  });

  // L2-025 AC2, AC3 · course-outline AC-4, AC-5, AC-6
  test('the outline opens finished lessons and the next one, and keeps the rest locked', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', enrolledAt42);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.contentSummary).toContainText(
      'Lessons open in order: finish one to unlock the next.',
    );
    expect((await course.sectionSummaries())[0]).toBe('1. Beginnings4 of 4 lessons completed');
    expect((await course.sectionSummaries())[2]).toBe(
      '3. Image and likeness1 of 5 lessons completed',
    );
    await expect(course.sections.nth(2)).toHaveAttribute('open', '');
    await expect(course.sections.nth(0)).not.toHaveAttribute('open', '');
    const done = course.lessons.first();
    await expect(done).toHaveAttribute('href', `${path}/lessons/l1-1`);
    await expect(done).toContainText('completed');
    const next = course.outline.getByRole('link', { name: /^3\.2 Representing/ });
    await expect(next).toHaveAttribute('aria-current', 'step');
    await expect(course.lessons.last()).toContainText('locked: finish the previous lesson first');
  });

  // L2-025 AC3 · progress-bar AC-3
  test('a learner who finished the course sees it done and can view their certificate', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', completedState);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.progressBar).toHaveAttribute('aria-valuenow', '100');
    await expect(course.progressHelp).toHaveText('Completed Wed, Sep 2, 2026 · 24 of 24 lessons');
    await expect(course.certificate).toHaveAttribute('href', '/certificates/LL-7K2M9X');
    await expect(course.review).toHaveAttribute('href', `${path}/lessons/l1-1`);
    await expect(course.continueLink).toHaveCount(0);
  });

  // L2-025 AC5 · alert AC-1
  test('an archived course tells its learners it is no longer maintained', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', {
      ...imagoDeiCourse,
      archivedOn: '2026-10-09',
    });
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', enrolledAt42);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.archivedTitle).toHaveText('This course is no longer maintained');
    await expect(course.archived).toContainText('archived it on Fri, Oct 9, 2026');
    await expect(course.archived).toContainText('You can still finish it');
    await expect(course.continueLink).toBeVisible();
  });

  // L2-025 AC5
  test('an archived course the viewer is not enrolled in is not found', async ({ page, api }) => {
    api.fail('GET', '/courses/imago-dei-in-an-age-of-machines', 404, 'not-found');
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.heading).toHaveText("We can't find that page");
  });

  // L2-025 AC4 · card AC-1
  test('a learner in a cohort sees a link to the cohort space', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', {
      ...enrolledAt42,
      cohort: { name: 'Imago Dei, Autumn 2026', path: '/cohorts/imago-dei-autumn-2026' },
    });
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.cohort).toContainText('Imago Dei, Autumn 2026');
    await expect(course.cohort.getByRole('link')).toHaveAttribute(
      'href',
      '/cohorts/imago-dei-autumn-2026',
    );
  });

  // L2-027 AC3 · dialog AC-2
  test('Leave course asks first, and Stay enrolled leaves the enrolment alone', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', enrolledAt42);
    const course = new CourseOverviewPage(page);
    const leave = new LeaveCourseDialog(page);
    await course.open(path);

    await course.leave.click();

    await expect(leave.title).toHaveText('Leave Imago Dei in an Age of Machines?');
    await expect(leave.dialog).toHaveAccessibleDescription(
      'The course leaves My learning and you stop getting its updates. We keep your progress (10 of 24 lessons), so if you enrol again you carry on from there.',
    );
    await expect(leave.stay).toBeFocused();

    await leave.stay.click();

    await expect(leave.dialog).toHaveCount(0);
    await expect(course.leave).toBeFocused();
    expect(
      api.requestsTo('DELETE', '/courses/imago-dei-in-an-age-of-machines/enrolment'),
    ).toHaveLength(0);
  });

  // L2-027 AC3 · dialog AC-9
  test('leaving says progress is kept, and the course goes back to Enrol', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', enrolledAt42);
    const release = api.hold('DELETE', '/courses/imago-dei-in-an-age-of-machines/enrolment', {
      keepUntil: '2027-10-13',
      resumeAt: '3.2',
    });
    const course = new CourseOverviewPage(page);
    const leave = new LeaveCourseDialog(page);
    await course.open(path);
    await course.leave.click();

    await leave.leave.click();

    await expect(leave.leaving).toHaveAttribute('aria-busy', 'true');
    await expect(leave.stay).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(leave.dialog).toBeVisible();

    release();

    await expect(leave.title).toHaveText('You’ve left Imago Dei in an Age of Machines');
    await expect(leave.alertTitle).toHaveText('You’ve left the course');
    await expect(leave.alert).toContainText(
      'Your progress is kept until Wed, Oct 13, 2027, so enrolling again before then picks up at lesson 3.2.',
    );
    await expect(leave.explore).toHaveAttribute('href', '/explore?type=course');
    await expect(leave.myLearning).toHaveAttribute('href', '/my-learning');

    await leave.close.click();

    await expect(leave.dialog).toHaveCount(0);
    await expect(course.enrol).toBeVisible();
    await expect(course.leave).toHaveCount(0);
  });

  // L2-141 AC2 · dialog AC-10
  test('a leave that fails says nothing changed and offers another try', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', enrolledAt42);
    api.fail('DELETE', '/courses/imago-dei-in-an-age-of-machines/enrolment', 500);
    const course = new CourseOverviewPage(page);
    const leave = new LeaveCourseDialog(page);
    await course.open(path);
    await course.leave.click();

    await leave.leave.click();

    await expect(leave.alertTitle).toHaveText('We couldn’t remove the course');
    await expect(leave.alert).toContainText(
      'Nothing has changed: you’re still enrolled. Check your connection and try again.',
    );

    api.respond('DELETE', '/courses/imago-dei-in-an-age-of-machines/enrolment', {
      keepUntil: '2027-10-13',
      resumeAt: '3.2',
    });
    await leave.tryAgain.click();

    await expect(leave.alertTitle).toHaveText('You’ve left the course');
  });

  // L2-071 AC1, AC2 · button AC-1
  test('a member who is not enrolled can save the course and take it back', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    api.respond('PUT', '/me/saved-items/course/c-imago-dei', undefined, 204);
    api.respond('DELETE', '/me/saved-items/course/c-imago-dei', undefined, 204);
    const course = new CourseOverviewPage(page);
    await course.open(path);
    await expect(course.save).toHaveText('Save');
    await expect(course.save).toHaveAttribute('aria-pressed', 'false');

    await course.save.click();

    await expect(course.save).toHaveText('Saved');
    await expect(course.save).toHaveAttribute('aria-pressed', 'true');
    await expect(course.saveStatus).toHaveText('Saved');

    await course.save.click();

    await expect(course.save).toHaveText('Save');
    await expect(course.saveStatus).toHaveText('Removed from Saved');
  });

  // L2-071 AC1
  test('a course the member already saved opens as Saved, and a visitor has no Save', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', {
      ...imagoDeiCourse,
      saved: true,
    });
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    const course = new CourseOverviewPage(page);
    await course.open(path);
    await expect(course.save).toHaveText('Saved');
    await expect(course.save).toHaveAttribute('aria-pressed', 'true');
  });

  // L2-071 AC4 · alert AC-1
  test('a save that fails, or that Saved cannot hold, says so', async ({ page, api }) => {
    api.respond('GET', '/me', members.miriam);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines/me', notEnrolled);
    api.fail('PUT', '/me/saved-items/course/c-imago-dei', 500);
    const course = new CourseOverviewPage(page);
    await course.open(path);

    await course.save.click();

    await expect(course.saveAlertTitle).toHaveText("We couldn't save this just now");
    await expect(course.save).toHaveText('Save');

    api.fail('PUT', '/me/saved-items/course/c-imago-dei', 409, 'saved-limit-reached');
    await course.save.click();

    await expect(course.saveAlertTitle).toHaveText('Saved is full');
  });

  // L2-127 AC3 · skeleton AC-1
  test('while the course loads the page is busy and announces it once', async ({ page, api }) => {
    const release = api.hold('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.heading).toHaveText('Course');
    await expect(course.loadingMessages).toHaveText(['Loading the course…']);

    release();

    await expect(course.heading).toHaveText('Imago Dei in an Age of Machines');
  });

  // L2-141 AC2 · empty-state AC-2
  test('a course that fails to load offers another try and the way to support', async ({
    page,
    api,
  }) => {
    api.fail('GET', '/courses/imago-dei-in-an-age-of-machines', 500);
    const course = new CourseOverviewPage(page);

    await course.open(path);

    await expect(course.emptyTitle).toHaveText('We couldn’t load this course');
    await expect(course.shell.main.getByRole('link', { name: 'Contact support' })).toHaveAttribute(
      'href',
      'mailto:help@logoslab.ca',
    );

    api.respond('GET', '/courses/imago-dei-in-an-age-of-machines', imagoDeiCourse);
    await course.tryAgain.click();

    await expect(course.heading).toHaveText('Imago Dei in an Age of Machines');
  });
});
