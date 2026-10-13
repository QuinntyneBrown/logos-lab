import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A list of rows, with no markers: links, text and secondary text. */
@Component({
  selector: 'ul[llList], ol[llList]',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'list',
    role: 'list',
    '[class.list--plain]': 'plain()',
    '[attr.aria-label]': 'label()',
    '[attr.aria-busy]': 'busy() || null',
  },
})
export class List {
  /** Rows without hairlines between them. */
  readonly plain = input(false, { transform: booleanAttribute });
  /** The list's name, when it is not inside a section that names it. */
  readonly label = input<string | null>(null);
  readonly busy = input(false, { transform: booleanAttribute });
}
