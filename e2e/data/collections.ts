import { content } from './content';
import { people } from './people';

const items = [
  content.fiveQuestions,
  content.liveQa,
  content.neuralNetwork,
  content.sabbath,
  content.biasInTrainingData,
  content.augustineAlgorithm,
  content.augustineLlms,
  content.canAMachinePray,
];

/** GET /api/v1/collections/ai-in-the-pulpit: docs/mocks/pages/collection-page/default. */
export const aiInThePulpit = {
  id: 'col-ai-in-the-pulpit',
  slug: 'ai-in-the-pulpit',
  title: 'AI in the Pulpit',
  description:
    'Eight pieces for preachers and church leaders wondering how, and whether, AI belongs in sermon preparation, pastoral care and parish life.',
  coverUrl: null,
  curator: people.thomas,
  items,
  itemCount: 8,
  totalMinutes: 600,
  updatedAt: '2026-10-02',
  followerCount: 412,
  following: false,
};

/** GET /api/v1/me/collections/col-ai-in-the-pulpit/progress: docs/mocks/pages/collection-page/progress. */
export const aiInThePulpitProgress = {
  completed: 3,
  total: 8,
  items: [
    { itemId: content.fiveQuestions.id, state: 'completed' },
    { itemId: content.liveQa.id, state: 'not-started' },
    { itemId: content.neuralNetwork.id, state: 'completed' },
    { itemId: content.sabbath.id, state: 'completed' },
    { itemId: content.biasInTrainingData.id, state: 'not-passed', score: 64, passMark: 80 },
    { itemId: content.augustineAlgorithm.id, state: 'not-started' },
    { itemId: content.augustineLlms.id, state: 'not-started' },
    { itemId: content.canAMachinePray.id, state: 'in-progress', percent: 52 },
  ],
};
