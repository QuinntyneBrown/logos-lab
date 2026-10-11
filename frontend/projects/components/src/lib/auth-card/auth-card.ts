import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Centres one focused task: sign in, register, reset, verify. */
@Component({
  selector: 'll-auth-card',
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCard {}
