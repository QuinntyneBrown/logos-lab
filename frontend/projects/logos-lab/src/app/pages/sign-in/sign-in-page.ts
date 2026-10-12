import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
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
import { countWords } from '../../content/count-words';
import { plural } from '../../content/plural';
import { safeReturnUrl } from '../../return-url';
import { Session } from '../../session';
import { readSignInFailure } from './read-sign-in-failure';
import { SignInFailure } from './sign-in-failure';
import { calendarDay } from '../../content/calendar-day';
import { clockTime } from '../../content/clock-time';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'll-sign-in-page',
  imports: [RouterLink, Alert, AuthCard, Form, FormField, FormSummary, Input, Button],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly authApi = inject(AUTH_API);
  private readonly session = inject(Session);
  private readonly router = inject(Router);
  private readonly query = toSignal(inject(ActivatedRoute).queryParamMap, { requireSync: true });
  private readonly returnUrl = computed(() => safeReturnUrl(this.query().get('returnUrl')));

  protected readonly busy = signal(false);
  protected readonly failure = signal<SignInFailure | null>(null);
  /** Why the visitor is here, until a refusal takes its place (L2-010). */
  protected readonly notice = computed(() => {
    if (this.failure()) return null;
    if (this.query().get('signedOut') === 'true') return 'signed-out';
    if (this.query().get('reason') === 'session-expired') return 'session-expired';
    return null;
  });
  protected readonly paused = computed(() => this.failure()?.kind === 'paused');
  private resumeTimer: ReturnType<typeof setTimeout> | undefined;
  private readonly summary = viewChild(FormSummary);

  protected readonly passwordShown = signal(false);
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly errors = signal<readonly FormError[]>([]);

  protected readonly emailError = computed(() => this.errorFor('email'));
  protected readonly passwordError = computed(() => this.errorFor('password'));
  protected readonly summaryHeading = computed(() =>
    plural(this.locale, this.errors().length, {
      one: $localize`:@@signIn.summary.one:One thing to fix before you can sign in`,
      other: $localize`:@@signIn.summary.other:${countWords(this.locale, this.errors().length)}:count: things to fix before you can sign in`,
    }),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resumeTimer));
  }

  protected submit(): void {
    if (this.paused()) return;
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    this.busy.set(true);
    this.failure.set(null);
    const returnUrl = this.returnUrl();
    this.authApi
      .signIn({ email: this.email().trim(), password: this.password(), returnUrl })
      .subscribe({
        next: (result) => {
          if (result.status === 'SecondFactorRequired') {
            void this.router.navigate(['/sign-in/verify'], { queryParams: { returnUrl } });
            return;
          }
          this.session.load();
          void this.router.navigateByUrl(returnUrl);
        },
        error: (error: unknown) => {
          this.busy.set(false);
          this.fail(readSignInFailure(error, new Date()));
        },
      });
  }

  /** "Tue, Oct 20, 2026" in the viewer's time zone. */
  protected day(date: Date): string {
    return calendarDay(this.locale, date);
  }

  /** "10:39 AM EDT" in the viewer's time zone. */
  protected time(date: Date): string {
    return clockTime(this.locale, date);
  }

  protected pausedHeading(minutes: number): string {
    return plural(this.locale, minutes, {
      one: $localize`:@@signIn.paused.one:Sign-in is paused for 1 minute`,
      other: $localize`:@@signIn.paused.other:Sign-in is paused for ${minutes}:count: minutes`,
    });
  }

  private fail(failure: SignInFailure | null): void {
    this.failure.set(failure);
    if (failure?.kind !== 'paused') return;
    // L2-009: the form reopens on its own once the throttle lifts.
    clearTimeout(this.resumeTimer);
    this.resumeTimer = setTimeout(
      () => this.failure.set(null),
      failure.until.getTime() - Date.now(),
    );
  }

  private validate(): FormError[] {
    const errors: FormError[] = [];
    const email = this.email().trim();
    if (!email)
      errors.push({
        controlId: 'email',
        message: $localize`:@@signIn.error.emailMissing:Enter your email`,
      });
    else if (!EMAIL.test(email))
      errors.push({
        controlId: 'email',
        message: $localize`:@@signIn.error.emailFormat:Enter your email in the form name@example.ca`,
      });
    if (!this.password())
      errors.push({
        controlId: 'password',
        message: $localize`:@@signIn.error.passwordMissing:Enter your password`,
      });
    return errors;
  }

  private errorFor(controlId: string): string | null {
    return this.errors().find((error) => error.controlId === controlId)?.message ?? null;
  }
}
