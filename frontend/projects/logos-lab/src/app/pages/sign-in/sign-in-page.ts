import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AUTH_API } from '@logos-lab/api';
import {
  AuthCard,
  Button,
  Form,
  FormError,
  FormField,
  FormSummary,
  Input,
} from '@logos-lab/components';
import { plural } from '../../content/plural';
import { safeReturnUrl } from '../../return-url';
import { Session } from '../../session';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'll-sign-in-page',
  imports: [RouterLink, AuthCard, Form, FormField, FormSummary, Input, Button],
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
      other: $localize`:@@signIn.summary.other:${this.errorCountWords()}:count: things to fix before you can sign in`,
    }),
  );

  protected submit(): void {
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
    this.busy.set(true);
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
        error: () => this.busy.set(false),
      });
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

  /** "Two" rather than "2" in the summary title, as the mocks write it. */
  private errorCountWords(): string {
    const count = this.errors().length;
    return count === 2
      ? $localize`:@@number.two:Two`
      : new Intl.NumberFormat(this.locale).format(count);
  }
}
