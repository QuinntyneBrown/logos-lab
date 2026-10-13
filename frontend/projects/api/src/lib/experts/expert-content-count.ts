import { ContentType } from '../content/content-type';

/** How many published items an expert has of one type. */
export interface ExpertContentCount {
  readonly type: ContentType;
  readonly count: number;
}
