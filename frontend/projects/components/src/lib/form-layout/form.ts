import { ChangeDetectionStrategy, Component } from '@angular/core';

/** A form laid out by the design system's form grid; validation is the page's. */
@Component({
  selector: 'form[llForm]',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'form', novalidate: '' },
})
export class Form {}
