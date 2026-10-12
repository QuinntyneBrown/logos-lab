import { ChangeDetectionStrategy, Component, computed, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AuthCard,
  Button,
  Form,
  FormError,
  FormField,
  FormSummary,
  Input,
} from '@logos-lab/components';
import { EMAIL_PATTERN } from '../../forms/email-pattern';

@Component({
  selector: 'll-forgot-password-page',
  imports: [RouterLink, AuthCard, Form, FormField, FormSummary, Input, Button],
  templateUrl: './forgot-password-page.html',
  styleUrl: './forgot-password-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
  private readonly summary = viewChild(FormSummary);

  protected readonly email = signal('');
  protected readonly errors = signal<readonly FormError[]>([]);
  protected readonly emailError = computed(() => this.errors()[0]?.message ?? null);

  protected submit(): void {
    const errors = this.validate();
    this.errors.set(errors);
    if (errors.length) {
      this.summary()?.focus();
      return;
    }
  }

  private validate(): FormError[] {
    const email = this.email().trim();
    if (!email)
      return [
        {
          controlId: 'email',
          message: $localize`:@@forgotPassword.error.emailMissing:Enter your email`,
        },
      ];
    if (!EMAIL_PATTERN.test(email))
      return [
        {
          controlId: 'email',
          message: $localize`:@@forgotPassword.error.emailFormat:Enter your email in the form name@example.ca`,
        },
      ];
    return [];
  }
}
