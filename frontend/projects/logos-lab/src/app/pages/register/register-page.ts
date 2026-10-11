import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AuthCard,
  Button,
  Checkbox,
  FieldHelp,
  Form,
  FormField,
  Input,
} from '@logos-lab/components';

@Component({
  selector: 'll-register-page',
  imports: [RouterLink, AuthCard, Form, FormField, FieldHelp, Checkbox, Input, Button],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  protected readonly passwordShown = signal(false);
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly terms = signal(false);
  protected readonly news = signal(false);
}
