import { HttpErrorResponse } from '@angular/common/http';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Injector,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AUTH_API, SecondFactorRequest } from '@logos-lab/api';
import {
  Alert,
  AuthCard,
  Button,
  Form,
  FormError,
  FormField,
  FormSummary,
  Input,
} from '@logos-lab/components';
import { clockTime } from '../../content/clock-time';
import { plural } from '../../content/plural';
import { retryAt } from '../../http/retry-at';
import { safeReturnUrl } from '../../return-url';
import { Session } from '../../session';
import { SignInVerifyFailure } from './sign-in-verify-failure';

const SIX_DIGITS = /^\d{6}$/;

/** The second sign-in step (detailed design accounts/set-up-two-step-verification). */
@Component({
  selector: 'll-sign-in-verify-page',
  imports: [RouterLink, Alert, AuthCard, Form, FormField, FormSummary, Input, Button],
  templateUrl: './sign-in-verify-page.html',
  styleUrl: './sign-in-verify-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInVerifyPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly injector = inject(Injector);
  private readonly authApi = inject(AUTH_API);
  private readonly session = inject(Session);
  private readonly router = inject(Router);
  private readonly summary = viewChild(FormSummary);
  private readonly query = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });
  private readonly returnUrl = computed(() => safeReturnUrl(this.query().get('returnUrl')));

  /** "Use a recovery code" is a link to `?method=recovery`, so Back returns to the app code. */
  protected readonly recovery = computed(() => this.query().get('method') === 'recovery');
  protected readonly code = signal('');
  protected readonly busy = signal(false);
  protected readonly errors = signal<readonly FormError[]>([]);
  protected readonly fieldError = computed(() => this.errors()[0]?.message ?? null);
  protected readonly failure = signal<SignInVerifyFailure | null>(null);
  protected readonly paused = computed(() => this.failure()?.kind === 'paused');
  private resumeTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resumeTimer));
  }

  protected submit(): void {
    if (this.busy() || this.paused()) return;
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    const value = this.code().trim();
    const request: SecondFactorRequest = this.recovery()
      ? { recoveryCode: value }
      : { code: value };
    this.busy.set(true);
    this.failure.set(null);
    this.authApi.verifySecondFactor(request).subscribe({
      next: () => {
        this.session.load();
        void this.router.navigateByUrl(this.returnUrl());
      },
      error: (error: unknown) => {
        this.busy.set(false);
        this.refused(error);
      },
    });
  }

  protected time(date: Date): string {
    return clockTime(this.locale, date);
  }

  private refused(error: unknown): void {
    const status = error instanceof HttpErrorResponse ? error.status : 0;
    if (status === 401) {
      const left = Number((error as HttpErrorResponse).error?.attemptsLeft ?? 0);
      this.errors.set([
        this.recovery()
          ? {
              controlId: 'recovery',
              message: $localize`:@@signInVerify.error.recoveryWrong:That recovery code doesn't match or has been used. Check it and try again.`,
            }
          : { controlId: 'code', message: this.wrongCode(left) },
      ]);
      afterNextRender(() => this.summary()?.focus(), { injector: this.injector });
      return;
    }
    if (status === 429) {
      const until = retryAt(
        (error as HttpErrorResponse).headers.get('Retry-After'),
        new Date(),
        900_000,
      );
      this.failure.set({ kind: 'paused', until });
      clearTimeout(this.resumeTimer);
      this.resumeTimer = setTimeout(
        () => this.failure.set(null),
        Math.max(0, until.getTime() - Date.now()),
      );
      return;
    }
    this.failure.set({ kind: 'unavailable' });
  }

  private wrongCode(left: number): string {
    return plural(this.locale, left, {
      one: $localize`:@@signInVerify.error.wrong.one:That code doesn't match. Enter the newest code from your app; you have ${left}:count: try left before a 15-minute pause.`,
      other: $localize`:@@signInVerify.error.wrong.other:That code doesn't match. Enter the newest code from your app; you have ${left}:count: tries left before a 15-minute pause.`,
    });
  }

  private validate(): FormError[] {
    const value = this.code().trim();
    if (this.recovery())
      return value
        ? []
        : [
            {
              controlId: 'recovery',
              message: $localize`:@@signInVerify.error.recoveryMissing:Enter a recovery code`,
            },
          ];
    return SIX_DIGITS.test(value)
      ? []
      : [
          {
            controlId: 'code',
            message: $localize`:@@signInVerify.error.code:Enter the 6-digit code from your app`,
          },
        ];
  }
}
