import { TopicExpert } from './topic-expert';

/** GET /api/v1/topics/{slug}: a topic and the experts who published in it. */
export interface Topic {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  /** All published items in the topic. */
  readonly itemCount: number;
  /** Whether Logos Lab itself has items in the topic. */
  readonly byLogosLab: boolean;
  readonly experts: readonly TopicExpert[];
}
