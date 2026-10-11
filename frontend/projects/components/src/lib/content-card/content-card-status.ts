import { BadgeTone } from '../badge/badge-tone';
import { IconName } from '../icon/icon-name';

/** A status badge on a content card. */
export interface ContentCardStatus {
  readonly label: string;
  readonly tone: BadgeTone;
  readonly plain?: boolean;
  readonly icon?: IconName;
}
