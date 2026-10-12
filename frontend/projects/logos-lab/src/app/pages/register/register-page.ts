import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import {
  Alert,
  AuthCard,
  Button,
  Checkbox,
  FieldHelp,
  Form,
  FormError,
  FormField,
  FormSummary,
  Input,
} from '@logos-lab/components';
import { countWords } from '../../content/count-words';
import { plural } from '../../content/plural';
import { retryAt } from '../../http/retry-at';
import { RegisterFailure } from './register-failure';
import { RegisterFieldError } from './register-field-error';
import { clockTime } from '../../content/clock-time';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'll-register-page',
  imports: [
    RouterLink,
    Alert,
    AuthCard,
    Form,
    FormField,
    FormSummary,
    FieldHelp,
    Checkbox,
    Input,
    Button,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly authApi = inject(AUTH_API);
  private readonly summary = viewChild(FormSummary);
  private readonly sentHeading = viewChild<ElementRef<HTMLElement>>('sentHeading');

  protected readonly busy = signal(false);
  protected readonly failure = signal<RegisterFailure | null>(null);
  protected readonly paused = computed(() => this.failure()?.kind === 'paused');
  private resumeTimer: ReturnType<typeof setTimeout> | undefined;
  /** The address the verification email went to, once the API accepted the registration. */
  protected readonly sentTo = signal<string | null>(null);

  protected readonly passwordShown = signal(false);
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly terms = signal(false);
  protected readonly news = signal(false);
  protected readonly errors = signal<readonly FormError[]>([]);

  protected readonly nameError = computed(() => this.errorFor('name'));
  protected readonly emailError = computed(() => this.errorFor('email'));
  protected readonly passwordError = computed(() => this.errorFor('password'));
  protected readonly termsError = computed(() => this.errorFor('terms'));
  protected readonly summaryHeading = computed(() =>
    plural(this.locale, this.errors().length, {
      one: $localize`:@@register.summary.one:One thing to fix before you can create your account`,
      other: $localize`:@@register.summary.other:${countWords(this.locale, this.errors().length)}:count: things to fix before you can create your account`,
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
    const email = this.email().trim();
    this.authApi
      .register({
        displayName: this.name().trim(),
        email,
        password: this.password(),
        acceptedTerms: this.terms(),
        marketingConsent: this.news(),
      })
      .subscribe({
        next: () => {
          this.busy.set(false);
          this.sentTo.set(email);
          // The form gives way to the confirmation; its heading takes focus so it is read out.
          setTimeout(() => {
            window.scrollTo({ top: 0 });
            this.sentHeading()?.nativeElement.focus();
          });
        },
        error: (error: unknown) => {
          this.busy.set(false);
          this.refused(error);
        },
      });
  }

  /** "10:34 AM EDT" in the viewer's time zone. */
  protected time(date: Date): string {
    return clockTime(this.locale, date);
  }

  /** "Wrong address? Start again": back to an empty form. */
  protected startAgain(): void {
    this.name.set('');
    this.email.set('');
    this.password.set('');
    this.terms.set(false);
    this.news.set(false);
    this.passwordShown.set(false);
    this.errors.set([]);
    this.sentTo.set(null);
  }

  private refused(error: unknown): void {
    if (error instanceof HttpErrorResponse && error.status === 422) {
      const errors = this.fieldErrors(error.error?.errors);
      if (errors.length) {
        this.errors.set(errors);
        setTimeout(() => this.summary()?.focus());
        return;
      }
    }
    if (error instanceof HttpErrorResponse && error.status === 429) {
      const until = retryAt(error.headers.get('Retry-After'), new Date(), 10 * 60_000);
      this.failure.set({ kind: 'paused', until });
      // L2-006 AC7: the form reopens on its own once the pause ends.
      clearTimeout(this.resumeTimer);
      this.resumeTimer = setTimeout(() => this.failure.set(null), until.getTime() - Date.now());
      return;
    }
    this.failure.set({ kind: 'unavailable' });
  }

  /** The API's field errors the page can explain; an unknown one makes the whole list unusable. */
  private fieldErrors(problems: readonly RegisterFieldError[] | undefined): FormError[] {
    const errors = (problems ?? []).map((problem) => this.fieldError(problem));
    return errors.every((error) => error !== null) ? errors : [];
  }

  private fieldError(problem: RegisterFieldError): FormError | null {
    if (problem.field === 'password' && problem.code === 'breached')
      return {
        controlId: 'password',
        message: $localize`:@@register.error.breached:This password has appeared in a data breach. Choose a different one.`,
      };
    return null;
  }

  private validate(): FormError[] {
    const errors: FormError[] = [];
    const name = this.name().trim();
    if (name.length < 2 || name.length > 50)
      errors.push({
        controlId: 'name',
        message: $localize`:@@register.error.name:Enter a name of 2 to 50 characters`,
      });
    const email = this.email().trim();
    if (!email)
      errors.push({
        controlId: 'email',
        message: $localize`:@@register.error.emailMissing:Enter your email`,
      });
    else if (!EMAIL.test(email))
      errors.push({
        controlId: 'email',
        message: $localize`:@@register.error.emailFormat:Enter your email in the form name@example.ca`,
      });
    const length = this.password().length;
    if (length < 12)
      errors.push({
        controlId: 'password',
        message: $localize`:@@register.error.passwordShort:Use at least 12 characters. This one has ${length}:count:.`,
      });
    else if (length > 128)
      errors.push({
        controlId: 'password',
        message: $localize`:@@register.error.passwordLong:Use at most 128 characters. This one has ${length}:count:.`,
      });
    if (!this.terms())
      errors.push({
        controlId: 'terms',
        message: $localize`:@@register.error.terms:Accept the Terms of Use and the Privacy Policy to create an account`,
      });
    return errors;
  }

  private errorFor(controlId: string): string | null {
    return this.errors().find((error) => error.controlId === controlId)?.message ?? null;
  }
}
