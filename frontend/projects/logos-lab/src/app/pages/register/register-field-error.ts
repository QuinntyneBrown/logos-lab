/** One field error in the API's 422 problem response for a registration. */
export interface RegisterFieldError {
  readonly field: string;
  readonly code: string;
}
