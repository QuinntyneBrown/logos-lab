/** One validation error, linked from the form summary to its control. */
export interface FormError {
  readonly controlId: string;
  readonly message: string;
}
