import { Directive } from '@angular/core';

/** Marks help with links projected into a form field, in place of its `help` text. */
@Directive({ selector: '[llFieldHelp]' })
export class FieldHelp {}
