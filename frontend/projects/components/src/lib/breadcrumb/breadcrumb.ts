import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterLink, UrlTree } from '@angular/router';
import { BreadcrumbBottom } from './breadcrumb-bottom';
import { BreadcrumbItem } from './breadcrumb-item';
import { BreadcrumbTop } from './breadcrumb-top';

/** The trail from the top of the site to the current page. */
@Component({
  selector: 'nav[llBreadcrumb]',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'breadcrumb-nav',
    '[class.breadcrumb-nav--top-xs]': "top() === 'xs'",
    '[class.breadcrumb-nav--top-md]': "top() === 'md'",
    '[class.breadcrumb-nav--bottom-sm]': "bottom() === 'sm'",
    '[attr.aria-label]': 'label()',
  },
})
export class Breadcrumb {
  /** The trail, root first; only the last item may be the current page. */
  readonly items = input.required<readonly BreadcrumbItem[]>();
  /** The landmark's name: "Breadcrumb". */
  readonly label = input.required<string>();
  readonly top = input<BreadcrumbTop>('none');
  readonly bottom = input<BreadcrumbBottom>('none');

  private readonly router = inject(Router);

  /** A link target that keeps a query string in the path. */
  protected target(path: string): UrlTree {
    return this.router.parseUrl(path);
  }
}
