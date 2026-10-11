import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, Hero, Search } from '@logos-lab/components';

@Component({
  selector: 'll-home-page',
  imports: [RouterLink, Hero, Search, Button],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
