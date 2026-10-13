import { LeaveResult } from '@logos-lab/api';
import { Observable } from 'rxjs';

/** What the leave-course dialog says and does. */
export interface LeaveCourseDialogData {
  readonly courseTitle: string;
  /** What is kept, as the page words it: "10 of 24 lessons". */
  readonly progress: string;
  /** Leaves the course; the dialog then shows when the kept progress expires. */
  readonly leave: () => Observable<LeaveResult>;
}
