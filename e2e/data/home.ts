import { content } from './content';
import { events } from './events';
import { experts } from './experts';

type Status = 'ok' | 'empty' | 'unavailable';

const section = <T>(items: readonly T[], status: Status = items.length ? 'ok' : 'empty') => ({
  status,
  items,
});

/** GET /api/v1/home for the default home page (docs/mocks/pages/home/default). */
export function homePage(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    featured: section([
      content.imagoDei,
      content.canAMachinePray,
      content.augustineLlms,
      content.aiInThePulpit,
    ]),
    latest: section([
      content.augustineAlgorithm,
      content.fiveQuestions,
      content.biasInTrainingData,
      content.liveQa,
      content.faithWork,
      content.sabbath,
      content.neuralNetwork,
      content.personhoodReading,
    ]),
    upcomingEvents: section([events.creativityEvening, events.liveQa, events.policyWorkshop]),
    featuredExperts: section([experts.abena, experts.thomas, experts.joel]),
    ...overrides,
  };
}

export { section };
