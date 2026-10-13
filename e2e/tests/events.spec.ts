import { eventList } from '../data/events-listing';
import { expect, test } from '../fixtures/test';
import { EventsPage } from '../pages/events.page';

test.describe('Events listing', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // L2-051 AC1 · event-row AC-1, AC-2, AC-3
  test('lists the upcoming events soonest first, with when, where, host and places left', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/events', eventList());
    const events = new EventsPage(page);

    await events.open();

    await expect(page).toHaveTitle('Events - Logos Lab');
    await expect(events.eyebrow).toHaveText('Live, online and in person');
    await expect(events.heading).toHaveText('Events');
    await expect(events.sub).toHaveText(
      'Live Q&As, workshops and evenings with Logos Lab experts. Times are in your time zone, Eastern Time (ET).',
    );
    await expect(events.count).toHaveText('3 upcoming events, soonest first');
    await expect(events.rows).toHaveCount(3);

    const first = events.row(0);
    await expect(first).toContainText('22');
    await expect(first).toContainText('Oct');
    await expect(first.getByRole('link')).toHaveText('Faith and AI Evening: Is Creativity Sacred?');
    await expect(first.getByRole('link')).toHaveAttribute(
      'href',
      '/events/faith-and-ai-evening-is-creativity-sacred',
    );
    // Browsers differ in "PM" and "p.m." and in the spaces round the dash.
    await expect(first).toContainText(/Thu, Oct 22, 7:00\s?[–-]\s?9:00\s?(PM|p\.m\.) ET/);
    await expect(first).toContainText(
      "In person · St. Brigid's Hall, Ottawa · hosted by Logos Lab",
    );
    await expect(first).toContainText('33 places left');
    await expect(events.row(1)).toContainText('Online · hosted by Dr. Abena Mensah');
    await expect(events.row(1)).not.toContainText('places left');
    await expect(events.row(2)).toContainText(
      'Hybrid · online and in Ottawa · hosted by Rev. Dr. Thomas Hale',
    );
    await expect(events.row(2)).toContainText('Full · waitlist open');
  });
});
