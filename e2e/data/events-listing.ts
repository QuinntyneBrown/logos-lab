import { events } from './events';

const hosts = {
  creativityEvening: ['Logos Lab'],
  liveQa: ['Dr. Abena Mensah'],
  policyWorkshop: ['Rev. Dr. Thomas Hale'],
};

const upcoming = [
  { ...events.creativityEvening, hosts: hosts.creativityEvening },
  { ...events.liveQa, hosts: hosts.liveQa },
  { ...events.policyWorkshop, hosts: hosts.policyWorkshop },
].map((event) => ({
  ...event,
  happeningNow: false,
  hasRecording: false,
  registration: null,
}));

const topics = [
  { slug: 'theology-of-technology', name: 'Theology of technology' },
  { slug: 'ai-ethics', name: 'AI ethics' },
  { slug: 'pastoral-care', name: 'Pastoral care' },
];

const people = [
  { slug: 'logos-lab', name: 'Logos Lab' },
  { slug: 'abena-mensah', name: 'Dr. Abena Mensah' },
  { slug: 'thomas-hale', name: 'Rev. Dr. Thomas Hale' },
];

/** GET /api/v1/events as the API answers it (EventList): the three upcoming events by default. */
export function eventList(overrides: Record<string, unknown> = {}) {
  return {
    events: upcoming,
    total: upcoming.length,
    totalEvents: upcoming.length,
    nextCursor: null,
    topics,
    hosts: people,
    ...overrides,
  };
}

/** Past events, newest first, as the Past tab lists them. */
export const pastEvents = [
  {
    id: 'e-work-rest',
    title: 'Panel: Work, Rest and Automation',
    slug: 'panel-work-rest-and-automation',
    startsAt: '2026-09-24T23:00:00Z',
    endsAt: '2026-09-25T01:00:00Z',
    attendance: 'online',
    venue: null,
    registeredCount: 204,
    placesLeft: null,
    full: false,
    waitlistOpen: false,
    hosts: ['Logos Lab'],
    happeningNow: false,
    hasRecording: true,
    registration: null,
  },
  {
    id: 'e-prayer-tech',
    title: 'Evening: Prayer and the Phone',
    slug: 'evening-prayer-and-the-phone',
    startsAt: '2026-09-10T23:00:00Z',
    endsAt: '2026-09-11T01:00:00Z',
    attendance: 'in-person',
    venue: "St. Brigid's Hall, Ottawa",
    registeredCount: 60,
    placesLeft: 0,
    full: true,
    waitlistOpen: false,
    hosts: ['Rev. Dr. Thomas Hale'],
    happeningNow: false,
    hasRecording: false,
    registration: null,
  },
];

/** The home page's three events with their listing extras, to adjust one at a time. */
export const upcomingEvents = upcoming;
