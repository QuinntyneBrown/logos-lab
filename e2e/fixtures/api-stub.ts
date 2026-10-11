import type { Page, Request, Route } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Media the API would serve from its CDN: the design system's cast photographs. */
const PHOTOS = join(__dirname, '../../docs/design-system/assets/photos');

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface StubbedResponse {
  status: number;
  body?: unknown;
  /** Hold the response until release() is called, to observe loading and busy states. */
  held?: boolean;
}

interface Stub {
  method: Method;
  path: string;
  response: StubbedResponse;
  release?: () => void;
  gate?: Promise<void>;
}

/**
 * Stands in for the Logos Lab API at /api/v1. Tests declare the responses a screen needs;
 * anything undeclared answers 501 so a missing stub fails loudly instead of hanging.
 */
export class ApiStub {
  private readonly stubs: Stub[] = [];
  readonly requests: { method: string; path: string; body: unknown }[] = [];

  constructor(private readonly page: Page) {}

  async install(): Promise<void> {
    await this.page.route('**/api/v1/**', (route) => this.handle(route));
    await this.page.route('**/media/*.jpg', async (route) => {
      const name = new URL(route.request().url()).pathname.split('/').pop() ?? '';
      try {
        await route.fulfill({
          contentType: 'image/jpeg',
          body: await readFile(join(PHOTOS, name)),
        });
      } catch {
        await route.fulfill({ status: 404 });
      }
    });
  }

  /** Answer `method path` with `body`. The latest declaration for a path wins. */
  respond(method: Method, path: string, body: unknown, status = 200): this {
    this.stubs.unshift({ method, path, response: { status, body } });
    return this;
  }

  /** Answer with an RFC 9457 problem response. */
  fail(method: Method, path: string, status = 500, code = 'internal_error'): this {
    return this.respond(
      method,
      path,
      { type: 'about:blank', status, code, title: 'Error' },
      status,
    );
  }

  /** Hold `method path` until the returned function is called, then answer with `body`. */
  hold(method: Method, path: string, body: unknown, status = 200): () => void {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => (release = resolve));
    this.stubs.unshift({ method, path, response: { status, body, held: true }, gate, release });
    return release;
  }

  /** The requests the page made to `method path`. */
  requestsTo(method: Method, path: string) {
    return this.requests.filter((r) => r.method === method && r.path === path);
  }

  private async handle(route: Route): Promise<void> {
    const request: Request = route.request();
    const url = new URL(request.url());
    const path = url.pathname.replace(/^\/api\/v1/, '') + url.search;
    const pathOnly = url.pathname.replace(/^\/api\/v1/, '');
    const method = request.method() as Method;
    this.requests.push({ method, path: pathOnly, body: parseBody(request) });
    const stub = this.stubs.find(
      (s) => s.method === method && (s.path === path || s.path === pathOnly),
    );
    if (!stub) {
      await route.fulfill({
        status: 501,
        contentType: 'application/problem+json',
        body: JSON.stringify({ status: 501, code: 'not_stubbed', title: `${method} ${path}` }),
      });
      return;
    }
    if (stub.gate) await stub.gate;
    const { status, body } = stub.response;
    await route.fulfill({
      status,
      contentType: status >= 400 ? 'application/problem+json' : 'application/json',
      body: body === undefined ? '' : JSON.stringify(body),
    });
  }
}

function parseBody(request: Request): unknown {
  try {
    return request.postDataJSON();
  } catch {
    return request.postData();
  }
}
