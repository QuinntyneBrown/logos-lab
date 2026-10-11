import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthCard, Button, Form, FormField, Input } from '@logos-lab/components';

@Component({
  selector: 'll-sign-in-page',
  imports: [RouterLink, AuthCard, Form, FormField, Input, Button],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  protected readonly passwordShown = signal(false);
}
