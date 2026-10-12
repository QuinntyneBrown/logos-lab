/** Where signing in returns to: a same-site path only, otherwise the dashboard (ReturnUrlPolicy). */
export function safeReturnUrl(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return '/dashboard';
  }
  return value;
}
