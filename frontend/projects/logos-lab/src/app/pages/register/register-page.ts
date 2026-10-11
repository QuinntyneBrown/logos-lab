import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
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

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'll-register-page',
  imports: [RouterLink, AuthCard, Form, FormField, FormSummary, FieldHelp, Checkbox, Input, Button],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly summary = viewChild(FormSummary);

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

  protected submit(): void {
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) this.summary()?.focus();
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
