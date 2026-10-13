import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { LeaveResult } from '@logos-lab/api';
import { LeaveCourseDialogData } from './leave-course/leave-course-dialog-data';
import { modalConfig } from './modal-config';

/** Opens the dialogs of the course features; their code loads when the first one is needed. */
@Injectable({ providedIn: 'root' })
export class CourseDialogs {
  private readonly dialog = inject(Dialog);

  /** Resolves with what leaving answered once the member has left, else `undefined`. */
  async confirmLeave(data: LeaveCourseDialogData): Promise<LeaveResult | undefined> {
    const { LeaveCourseDialog } = await import('./leave-course/leave-course-dialog');
    const ref = this.dialog.open<LeaveResult, LeaveCourseDialogData>(
      LeaveCourseDialog,
      modalConfig<LeaveCourseDialogData, LeaveResult>(data, 'leave-title', 'leave-desc'),
    );
    return new Promise((resolve) => ref.closed.subscribe((result) => resolve(result)));
  }
}
