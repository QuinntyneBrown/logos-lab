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

export { upcoming as upcomingEvents };
