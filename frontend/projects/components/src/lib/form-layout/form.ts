import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A form laid out by the design system's form grid; validation is the page's. */
@Component({
  selector: 'form[llForm]',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'form', novalidate: '', '[class.form-card]': 'card()' },
})
export class Form {
  /** The form itself is the surface card, as on the settings pages (form-layout CRD AC-9). */
  readonly card = input(false, { transform: booleanAttribute });
}
