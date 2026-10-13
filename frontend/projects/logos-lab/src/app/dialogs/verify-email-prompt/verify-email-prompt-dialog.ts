import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  LOCALE_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import { Alert, Button, Dialog } from '@logos-lab/components';
import { calendarDay } from '../../content/calendar-day';
import { clockTime } from '../../content/clock-time';
import { retryAt } from '../../http/retry-at';
import { Session } from '../../session';
import { ResendState } from './resend-state';
import { VerifyEmailPromptData } from './verify-email-prompt-data';

/** A wait longer than this is the daily limit, not the minute between emails. */
const DAILY_LIMIT_AFTER_SECONDS = 3600;

/** Asks an unverified member to verify their email, and sends the link again (L2-007). */
@Component({
  selector: 'll-verify-email-prompt-dialog',
  imports: [Alert, Button, Dialog, RouterLink],
  templateUrl: './verify-email-prompt-dialog.html',
  styleUrl: './verify-email-prompt-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPromptDialog {
  protected readonly data = inject<VerifyEmailPromptData>(DIALOG_DATA);
  private readonly ref = inject<DialogRef<void>>(DialogRef);
  private readonly authApi = inject(AUTH_API);
  private readonly locale = inject(LOCALE_ID);

  private readonly session = inject(Session);
  protected readonly email = computed(() => this.session.member()?.email ?? '');
  protected readonly heading = computed(() =>
    this.resend().kind === 'sent'
      ? $localize`:@@verify.sent.title:Check your inbox`
      : this.data.title,
  );
  protected readonly resend = signal<ResendState>({ kind: 'idle' });

  private readonly now = signal(new Date());
  private ticker: ReturnType<typeof setInterval> | undefined;

  /** Seconds until "Resend email" works again; 0 when it works now. */
  protected readonly waitSeconds = computed(() => {
    const state = this.resend();
    if (state.kind !== 'sent' && state.kind !== 'waiting') return 0;
    return Math.max(0, Math.ceil((state.until.getTime() - this.now().getTime()) / 1000));
  });
  protected readonly sent = computed(() => this.resend().kind === 'sent');
  protected readonly dailyLimit = computed(() => {
    const state = this.resend();
    return state.kind === 'daily-limit' ? state : null;
  });
  protected readonly limitUntil = computed(() => {
    const until = this.dailyLimit()?.until;
    if (!until) return '';
    const time = clockTime(this.locale, until);
    const tomorrow = new Date(this.now().getTime() + 24 * 60 * 60 * 1000);
    return until.toDateString() === tomorrow.toDateString()
      ? $localize`:@@verify.limit.tomorrow:${time}:time: tomorrow`
      : $localize`:@@verify.limit.day:${time}:time: on ${calendarDay(this.locale, until)}:day:`;
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.ticker));
  }

  protected send(): void {
    if (this.resend().kind === 'sending' || this.waitSeconds() > 0 || this.dailyLimit()) return;
    this.resend.set({ kind: 'sending' });
    this.authApi.resendVerification().subscribe({
      next: (result) => {
        this.countDown({
          kind: 'sent',
          until: new Date(Date.now() + result.retryAfterSeconds * 1000),
        });
      },
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 429) {
          const until = retryAt(error.headers.get('Retry-After'), new Date(), 60_000);
          const seconds = (until.getTime() - Date.now()) / 1000;
          if (seconds > DAILY_LIMIT_AFTER_SECONDS) this.resend.set({ kind: 'daily-limit', until });
          else this.countDown({ kind: 'waiting', until });
        } else {
          this.resend.set({ kind: 'failed' });
        }
      },
    });
  }

  /** "Not now", the close control and "Back to …" all just close the prompt. */
  protected close(): void {
    this.ref.close();
  }

  private countDown(state: ResendState): void {
    clearInterval(this.ticker);
    this.now.set(new Date());
    this.resend.set(state);
    this.ticker = setInterval(() => {
      this.now.set(new Date());
      if (this.waitSeconds() === 0) clearInterval(this.ticker);
    }, 1000);
  }
}
