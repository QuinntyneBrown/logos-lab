import { IconName } from '../icon/icon-name';

/** One fact in the header's meta row: "1,284 followers". */
export interface ProfileMeta {
  readonly text: string;
  readonly icon?: IconName;
}
