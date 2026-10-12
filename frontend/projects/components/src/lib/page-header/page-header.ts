import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Skeleton } from '../skeleton/skeleton';
import { PageHeaderActions } from './page-header-actions';
import { PageHeaderBusy } from './page-header-busy';
import { PageHeaderTop } from './page-header-top';

/** The top of a page: eyebrow or breadcrumb, the page's only h1, a sub line and actions. */
@Component({
  selector: 'll-page-header',
  imports: [Skeleton],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  readonly heading = input.required<string>();
  readonly eyebrow = input<string | null>(null);
  readonly sub = input<string | null>(null);
  readonly actions = input<PageHeaderActions>('none');
  readonly top = input<PageHeaderTop>('lg');
  readonly busy = input<PageHeaderBusy>('none');
  readonly busyMessage = input<string | null>(null);
}
