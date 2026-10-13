import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeaveResult } from '@logos-lab/api';
import { Alert, Button, Dialog } from '@logos-lab/components';
import { dayWithWeekday } from '../../content/day-with-weekday';
import { LeaveCourseDialogData } from './leave-course-dialog-data';

/** Confirms leaving a course, then says what was kept (docs/mocks/dialogs/leave-course). */
@Component({
  selector: 'll-leave-course-dialog',
  imports: [Alert, Button, Dialog, RouterLink],
  templateUrl: './leave-course-dialog.html',
  styleUrl: './leave-course-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveCourseDialog {
  protected readonly data = inject<LeaveCourseDialogData>(DIALOG_DATA);
  private readonly ref = inject<DialogRef<LeaveResult>>(DialogRef);
  private readonly locale = inject(LOCALE_ID);

  protected readonly busy = signal(false);
  protected readonly failed = signal(false);
  protected readonly result = signal<LeaveResult | null>(null);

  protected readonly title = computed(() => {
    const course = this.data.courseTitle;
    return this.result()
      ? $localize`:@@leave.done.title:You’ve left ${course}:course:`
      : $localize`:@@leave.title:Leave ${course}:course:?`;
  });
  protected readonly description = $localize`:@@leave.description:The course leaves My learning and you stop getting its updates. We keep your progress (${this.data.progress}:progress:), so if you enrol again you carry on from there.`;
  protected readonly doneText = computed(() => {
    const course = this.data.courseTitle;
    const result = this.result();
    const until = result ? dayWithWeekday(this.locale, result.keepUntil) : '';
    if (result?.resumeAt) {
      const lesson = result.resumeAt;
      return $localize`:@@leave.done.body.lesson:${course}:course: is no longer in My learning. Your progress is kept until ${until}:date:, so enrolling again before then picks up at lesson ${lesson}:lesson:.`;
    }
    return $localize`:@@leave.done.body:${course}:course: is no longer in My learning. Your progress is kept until ${until}:date:, so enrolling again before then picks up where you stopped.`;
  });

  protected leave(): void {
    if (this.busy()) return;
    this.busy.set(true);
    this.failed.set(false);
    this.data.leave().subscribe({
      next: (result) => {
        this.busy.set(false);
        this.result.set(result);
      },
      error: () => {
        this.busy.set(false);
        this.failed.set(true);
      },
    });
  }

  /** "Stay enrolled", the close control or Escape; none of them works while the request runs. */
  protected dismiss(): void {
    if (this.busy()) return;
    const result = this.result();
    if (result) this.ref.close(result);
    else this.ref.close();
  }
}
