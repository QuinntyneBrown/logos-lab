import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthCard, Button, Form, FormField, Input } from '@logos-lab/components';

@Component({
  selector: 'll-forgot-password-page',
  imports: [RouterLink, AuthCard, Form, FormField, Input, Button],
  templateUrl: './forgot-password-page.html',
  styleUrl: './forgot-password-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
  protected readonly email = signal('');

  protected submit(): void {
    // Sending arrives with the next slice.
  }
}
