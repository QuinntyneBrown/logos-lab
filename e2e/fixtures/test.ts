import { test as base, expect } from '@playwright/test';
import { ApiStub } from './api-stub';

export const test = base.extend<{ api: ApiStub }>({
  api: async ({ page }, use) => {
    const api = new ApiStub(page);
    await api.install();
    await use(api);
  },
});

export { expect };
