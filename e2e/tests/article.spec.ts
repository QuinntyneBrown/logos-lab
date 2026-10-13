import { augustineArticle } from '../data/articles';
import { content } from '../data/content';
import { members } from '../data/members';
import { people } from '../data/people';
import { expect, test } from '../fixtures/test';
import { ArticlePage } from '../pages/article.page';

const path = '/articles/what-augustine-might-say-about-large-language-models';

test.describe('Article page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-045 AC1 · page-header AC-1, breadcrumb AC-1
  test('shows the title, subtitle, contributors, dates and reading time', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(page).toHaveTitle(`${augustineArticle.title} - Logos Lab`);
    await expect(article.breadcrumb.getByRole('link', { name: 'Explore' })).toHaveAttribute(
      'href',
      '/explore',
    );
    await expect(
      article.breadcrumb.getByRole('link', { name: 'Theology of technology' }),
    ).toHaveAttribute('href', '/topics/theology-of-technology');
    await expect(article.breadcrumb.locator('[aria-current="page"]')).toHaveText('Article');
    await expect(article.eyebrow).toHaveText('Article · 12 min read');
    await expect(article.heading).toHaveText(augustineArticle.title);
    await expect(article.subtitle).toHaveText(augustineArticle.subtitle);
    await expect(article.contributors).toHaveText(['Dr. Lucía Ortega']);
    await expect(article.contributors.first()).toHaveAttribute('href', '/experts/lucia-ortega');
    await expect(article.byline).toContainText('Published');
    await expect(article.dates).toHaveCount(2);
    await expect(article.dates.first()).toHaveAttribute('datetime', '2026-09-29');
    await expect(article.dates.last()).toHaveAttribute('datetime', '2026-10-06');
  });

  // L2-045 AC1 · prose AC-1, chip AC-1
  test('shows the cover, the body and the topics', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.cover).toHaveAttribute(
      'alt',
      'An open book beside a glowing laptop screen, drawn in line',
    );
    await expect(
      article.body.getByRole('heading', { level: 2, name: /^What a model/ }),
    ).toBeVisible();
    await expect(article.body.locator('.ref')).toContainText('Psalm 8:4');
    await expect(article.body.locator('blockquote')).toContainText('A store of data is not a self');
    expect(await article.bodyScriptRan()).toBe(false);
    await expect(article.topics.getByRole('link')).toHaveText([
      'Theology of technology',
      'Philosophy of mind',
      'Formation and education',
    ]);
    await expect(article.topics.getByRole('link').first()).toHaveAttribute(
      'href',
      '/topics/theology-of-technology',
    );
  });

  // L2-045 AC1 · alert AC-1
  test('a corrected article says what was corrected, above the body', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, {
      ...augustineArticle,
      correction: {
        date: '2026-10-06',
        note: 'An earlier version said Augustine wrote the Confessions in 387. He began them around 397.',
      },
    });
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.correction).toHaveAttribute('role', 'note');
    await expect(article.correctionTitle).toHaveText('Corrected on Oct 6, 2026');
    await expect(article.correction).toContainText('He began them around 397.');
  });

  // L2-045 AC1
  test('an article that never changed shows no updated date and no correction', async ({
    page,
    api,
  }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, {
      ...augustineArticle,
      updatedAt: null,
    });
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.dates).toHaveCount(1);
    await expect(article.byline).not.toContainText('Updated');
    await expect(article.correction).toHaveCount(0);
  });

  // L2-045 AC1 · page-header AC-1
  test('several contributors are joined by "with", and Logos Lab has no profile link', async ({
    page,
    api,
  }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, {
      ...augustineArticle,
      contributors: [people.lucia, people.thomas, people.logosLab],
    });
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.contributors).toHaveText(['Dr. Lucía Ortega', 'Rev. Dr. Thomas Hale']);
    await expect(article.byline).toContainText('with');
    await expect(article.byline).toContainText('Logos Lab');
  });

  // L2-047 AC1 · content-card AC-1
  test('shows up to four related items under Related', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    api.respond('GET', `/content/${augustineArticle.id}/related`, [
      content.augustineAlgorithm,
      content.imagoDei,
      content.sabbath,
      content.canAMachinePray,
    ]);
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.related).toBeVisible();
    await expect(article.related.getByRole('heading', { level: 2 })).toHaveText('Related');
    await expect(article.relatedCards).toHaveCount(4);
    await expect(article.relatedCards.first().locator('.content-card__title a')).toHaveText(
      'Augustine and the Algorithm',
    );
    await expect(article.relatedCards.first().locator('.content-card__title a')).toHaveAttribute(
      'href',
      '/videos/augustine-and-the-algorithm',
    );
  });

  // L2-047 AC3
  test('with nothing related the section is left out', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    api.respond('GET', `/content/${augustineArticle.id}/related`, []);
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.body).toBeVisible();
    await expect(article.related).toHaveCount(0);
  });

  // L2-047 AC3 · L2-141 AC2
  test('related items that fail to load leave the section out and the article readable', async ({
    page,
    api,
  }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    api.fail('GET', `/content/${augustineArticle.id}/related`, 500);
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.body).toBeVisible();
    await expect(article.related).toHaveCount(0);
  });

  // L2-045 AC1 · page-header AC-2
  test('the header counts the comments and links to them', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.commentsLink).toHaveText('23 comments');
    await expect(article.commentsLink).toHaveAttribute('href', /#comments$/);
    await expect(article.comments.getByRole('heading', { level: 2 })).toContainText('Comments');
    await expect(article.comments.getByRole('heading', { level: 2 })).toContainText('23');
  });

  // L2-045 AC1
  test('one comment is counted in the singular', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, {
      ...augustineArticle,
      commentCount: 1,
    });
    const article = new ArticlePage(page);

    await article.open(path);

    await expect(article.commentsLink).toHaveText('1 comment');
  });

  // L2-060 AC1 · L2-015 AC1
  test('a visitor is told how to join the conversation, a member is not', async ({ page, api }) => {
    api.respond('GET', `/articles/${augustineArticle.slug}`, augustineArticle);
    const article = new ArticlePage(page);
    await article.open(path);
    await expect(article.comments).toContainText(
      'Sign in to join the conversation. Anyone can read it.',
    );

    api.respond('GET', '/me', members.miriam);
    await page.reload();
    await article.heading.waitFor();

    await expect(article.comments).toBeVisible();
    await expect(article.comments).not.toContainText('Sign in to join the conversation');
  });
});
