import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Button, Footer, SkipLink, TopBar } from '@logos-lab/components';
import { PRIMARY_LINKS } from './primary-links';
import { RouteFocus } from './route-focus';

@Component({
  selector: 'll-root',
  imports: [RouterOutlet, RouterLink, SkipLink, TopBar, Footer, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly primaryLinks = PRIMARY_LINKS;

  constructor() {
    inject(RouteFocus).start();
  }
}
