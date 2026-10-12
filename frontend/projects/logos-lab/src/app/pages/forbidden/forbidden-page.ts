import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, ErrorPage } from '@logos-lab/components';

@Component({
  selector: 'll-forbidden-page',
  imports: [RouterLink, ErrorPage, Button],
  templateUrl: './forbidden-page.html',
  styleUrl: './forbidden-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenPage {}
