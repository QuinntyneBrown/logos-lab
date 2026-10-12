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
import { AUTH_API } from '@logos-lab/api';
import { NgTemplateOutlet } from '@angular/common';
import { Banner, Button } from '@logos-lab/components';
import { calendarDay } from '../content/calendar-day';
import { retryAt } from '../http/retry-at';
import { Session } from '../session';

/** Kept for the browser session, so "Dismiss for now" lasts until the next sign-in. */
const DISMISSED_KEY = 'll.accountBanner.dismissed';

/** From this long before deletion the banner names the date and cannot be dismissed. */
const FINAL_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * The account banner below the header for an unverified member (detailed design
 * accounts/verify-email, "Account banner rules").
 */
@Component({
  selector: 'll-account-banner',
  imports: [NgTemplateOutlet, Banner, Button],
  templateUrl: './account-banner.html',
  styleUrl: './account-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountBanner {
  private readonly locale = inject(LOCALE_ID);
  private readonly session = inject(Session);
  private readonly authApi = inject(AUTH_API);
  private readonly dismissed = signal(readDismissed());

  /** The address a new link went to, once "Resend email" succeeded. */
  protected readonly resentTo = signal<string | null>(null);
  protected readonly sending = signal(false);

  private readonly resendAt = signal<Date | null>(null);
  private readonly now = signal(new Date());
  private ticker: ReturnType<typeof setInterval> | undefined;
  protected readonly waitSeconds = computed(() => {
    const at = this.resendAt();
    return at ? Math.max(0, Math.ceil((at.getTime() - this.now().getTime()) / 1000)) : 0;
  });

  protected readonly unverified = computed(() => {
    const member = this.session.member();
    return member && !member.emailVerified ? member : null;
  });

  /** The deletion day once the account is in its final week, else null. */
  protected readonly deletionDay = computed(() => {
    const at = this.unverified()?.deleteUnverifiedAt;
    if (!at) return null;
    const date = new Date(at);
    return date.getTime() - Date.now() <= FINAL_WEEK_MS ? calendarDay(this.locale, date) : null;
  });

  protected readonly shown = computed(
    () => !!this.unverified() && (!this.dismissed() || !!this.deletionDay()),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.ticker));
  }

  protected resend(): void {
    if (this.sending() || this.waitSeconds() > 0) return;
    this.sending.set(true);
    this.authApi.resendVerification().subscribe({
      next: (result) => {
        this.sending.set(false);
        this.resentTo.set(result.sentTo);
      },
      error: (error: unknown) => {
        this.sending.set(false);
        if (error instanceof HttpErrorResponse && error.status === 429) {
          this.coolDown(retryAt(error.headers.get('Retry-After'), new Date(), 60_000));
        }
      },
    });
  }

  protected dismiss(): void {
    this.dismissed.set(true);
    try {
      sessionStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // Storage can be unavailable; the banner then stays hidden for this page only.
    }
  }

  private coolDown(until: Date): void {
    clearInterval(this.ticker);
    this.now.set(new Date());
    this.resendAt.set(until);
    this.ticker = setInterval(() => {
      this.now.set(new Date());
      if (this.waitSeconds() === 0) clearInterval(this.ticker);
    }, 1000);
  }
}

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}
