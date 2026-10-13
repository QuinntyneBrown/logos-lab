import { eventList, upcomingEvents } from '../data/events-listing';
import { members } from '../data/members';
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

  // L2-051 AC4 · badge AC-1
  test('an event that has started but not ended is labelled Happening now', async ({
    page,
    api,
  }) => {
    await page.clock.setFixedTime(new Date('2026-10-27T16:20:00Z'));
    const [, liveQa, workshop] = upcomingEvents;
    api.respond(
      'GET',
      '/events',
      eventList({
        events: [{ ...liveQa, happeningNow: true }, workshop],
        total: 2,
        totalEvents: 2,
      }),
    );
    const events = new EventsPage(page);

    await events.open();

    await expect(events.count).toHaveText('2 upcoming events, soonest first · 1 happening now');
    await expect(events.row(0)).toContainText('Happening now');
    await expect(events.row(0)).toContainText('started 20 minutes ago');
    await expect(events.row(1)).not.toContainText('Happening now');
    await expect(events.row(1)).not.toContainText('started');
  });

  // L2-051 AC1 · event-row AC-2
  test('a signed-in member sees which events they are registered for or waiting on', async ({
    page,
    api,
  }) => {
    api.respond('GET', '/me', members.miriam);
    const [creativity, liveQa, workshop] = upcomingEvents;
    api.respond(
      'GET',
      '/events',
      eventList({
        events: [
          creativity,
          { ...liveQa, registration: { status: 'registered', waitlistPosition: null } },
          { ...workshop, registration: { status: 'waitlisted', waitlistPosition: 3 } },
        ],
      }),
    );
    const events = new EventsPage(page);

    await events.open();

    await expect(events.row(0)).not.toContainText("You're registered");
    await expect(events.row(1)).toContainText("You're registered");
    await expect(events.row(2)).toContainText("Full · you're number 3 on the waitlist");
    await expect(events.row(2)).not.toContainText('waitlist open');
  });
});
