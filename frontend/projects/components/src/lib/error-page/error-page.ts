import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The body of the 404, 403, 410, 429, 500, 503 and offline pages. */
@Component({
  selector: 'll-error-page',
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPage {
  readonly code = input<string | null>(null);
}
