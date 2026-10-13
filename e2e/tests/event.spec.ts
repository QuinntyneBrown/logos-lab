import { eventPage, liveQaPage } from '../data/event-pages';
import { expect, test } from '../fixtures/test';
import { EventPage } from '../pages/event.page';

const path = '/events/live-qa-imago-dei-and-machine-personhood';

test.describe('Event page', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-052 AC1 · event-head AC-1, breadcrumb AC-1, prose AC-1
  test('shows what the event is, when and where it happens, who hosts it and what it covers', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', liveQaPage);
    const event = new EventPage(page);

    await event.open(path);

    await expect(page).toHaveTitle('Live Q&A: Imago Dei and Machine Personhood - Logos Lab');
    await expect(event.breadcrumb.getByRole('link', { name: 'Events' })).toHaveAttribute(
      'href',
      '/events',
    );
    await expect(event.breadcrumb.locator('[aria-current="page"]')).toHaveText(
      'Live Q&A: Imago Dei and Machine Personhood',
    );
    await expect(event.heading).toHaveText('Live Q&A: Imago Dei and Machine Personhood');
    await expect(event.date).toContainText('27');
    await expect(event.date).toContainText('Oct');
    await expect(event.facts.nth(0)).toContainText(/Tuesday.*October 27, 2026.*12:00.*1:00.*ET/);
    await expect(event.facts.nth(1)).toHaveText('Online');
    await expect(event.facts.nth(2)).toHaveText('Hosted by Dr. Abena Mensah');
    await expect(event.aboutText).toHaveCount(2);
    await expect(event.aboutText.first()).toContainText('Bring your questions about personhood');
    await expect(event.topics.getByRole('link')).toHaveText([
      'The image of God and personhood',
      'Philosophy of mind',
    ]);
    await expect(event.topics.getByRole('link').nth(1)).toHaveAttribute(
      'href',
      '/topics/philosophy-of-mind',
    );
    await expect(event.hosts).toHaveCount(1);
    await expect(event.hosts.first().getByRole('link')).toHaveAttribute(
      'href',
      '/experts/abena-mensah',
    );
    await expect(event.hosts.first()).toContainText('Theologian · leads the Imago Dei cohort');
  });

  // L2-052 AC1 · event-head AC-2
  test('names every host and gives a host without a profile no link', async ({ page, api }) => {
    api.respond(
      'GET',
      '/events/by-slug/live-qa-imago-dei-and-machine-personhood',
      eventPage({
        hosts: [
          {
            name: 'Logos Lab',
            slug: null,
            meta: 'Organised by the Logos Lab editors',
            photoUrl: null,
          },
          liveQaPage.hosts[0],
        ],
      }),
    );
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.facts.nth(2)).toHaveText('Hosted by Logos Lab and Dr. Abena Mensah');
    await expect(event.hosts).toHaveCount(2);
    await expect(event.hosts.first()).toContainText('Logos Lab');
    await expect(event.hosts.first().getByRole('link')).toHaveCount(0);
    await expect(event.hosts.nth(1).getByRole('link')).toHaveCount(1);
  });

  // L2-052 AC1 · L2-141
  test('an event that is not published shows the not-found page', async ({ page, api }) => {
    api.fail('GET', '/events/by-slug/live-qa-imago-dei-and-machine-personhood', 404, 'not-found');
    const event = new EventPage(page);

    await event.open(path);

    await expect(event.heading).toHaveText("We can't find that page");
  });
});
