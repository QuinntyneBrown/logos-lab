import { imagoDeiCourse, notEnrolled } from '../data/courses';
import { members } from '../data/members';
import { expect, test } from '../fixtures/test';
import { CourseOverviewPage } from '../pages/course-overview.page';

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
});
