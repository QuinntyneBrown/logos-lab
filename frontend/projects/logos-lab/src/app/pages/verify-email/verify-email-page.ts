import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  Injector,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AUTH_API, EmailVerification } from '@logos-lab/api';
import { Alert, AuthCard, Button, Form, FormField, SpinnerRegion } from '@logos-lab/components';
import { retryAt } from '../../http/retry-at';
import { VerifyEmailState } from './verify-email-state';
import { clockTime } from '../../content/clock-time';

@Component({
  selector: 'll-verify-email-page',
  imports: [RouterLink, Alert, AuthCard, Form, FormField, Button, SpinnerRegion],
  templateUrl: './verify-email-page.html',
  styleUrl: './verify-email-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly authApi = inject(AUTH_API);
  private readonly injector = inject(Injector);
  private readonly token = inject(ActivatedRoute).snapshot.queryParamMap.get('token') ?? '';
  private readonly heading = viewChild<ElementRef<HTMLElement>>('heading');

  protected readonly state = signal<VerifyEmailState>({ kind: 'loading' });
  protected readonly sending = signal(false);

  /** When "Resend email" turns back on; ticks once a second until then. */
  private readonly resendAt = signal<Date | null>(null);
  private readonly now = signal(new Date());
  private ticker: ReturnType<typeof setInterval> | undefined;
  protected readonly waitSeconds = computed(() => {
    const at = this.resendAt();
    return at ? Math.max(0, Math.ceil((at.getTime() - this.now().getTime()) / 1000)) : 0;
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.ticker));
    this.authApi.lookUpEmailVerification(this.token).subscribe({
      next: (verification) => this.state.set({ kind: 'ready', verification }),
      error: (error: unknown) => this.refused(error, null),
    });
  }

  protected confirm(verification: EmailVerification): void {
    this.state.set({ kind: 'loading' });
    this.authApi.confirmEmail(this.token).subscribe({
      next: () => this.show({ kind: 'verified', verification }, true),
      error: (error: unknown) => this.refused(error, verification),
    });
  }

  protected sendNewLink(): void {
    if (this.sending() || this.waitSeconds() > 0) return;
    this.sending.set(true);
    this.authApi.resendVerificationForToken(this.token).subscribe({
      next: (result) => {
        this.sending.set(false);
        const sentAt = new Date();
        const focus = this.state().kind !== 'sent';
        const { sentTo, remainingToday } = result;
        this.show({ kind: 'sent', sentTo, sentAt, remainingToday }, focus);
        this.coolDown(new Date(sentAt.getTime() + result.retryAfterSeconds * 1000));
      },
      error: (error: unknown) => {
        this.sending.set(false);
        if (error instanceof HttpErrorResponse && error.status === 429) {
          this.coolDown(retryAt(error.headers.get('Retry-After'), new Date(), 60_000));
        }
      },
    });
  }

  protected time(date: Date): string {
    return clockTime(this.locale, date);
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

  private refused(error: unknown, verification: EmailVerification | null): void {
    if (error instanceof HttpErrorResponse && error.status === 410) {
      const email = (error.error as { email?: string } | null)?.email ?? verification?.email;
      this.show({ kind: 'expired', email: email ?? null }, verification !== null);
    }
  }

  /** Shows a new state; after the visitor has acted, focus moves to its heading. */
  private show(state: VerifyEmailState, focus: boolean): void {
    this.state.set(state);
    if (focus) {
      afterNextRender(() => this.heading()?.nativeElement.focus(), { injector: this.injector });
    }
  }

  /** The greeting uses the first word of the display name: "Miriam Clarke" is greeted as "Miriam". */
  protected firstName(verification: EmailVerification): string {
    return verification.displayName.trim().split(/\s+/)[0];
  }
}
