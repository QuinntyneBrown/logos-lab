# Logos Lab Web

The Angular workspace for [www.logoslab.ca](https://www.logoslab.ca).

| Project                 | Path                  | Purpose                                                                   |
| ----------------------- | --------------------- | ------------------------------------------------------------------------- |
| `logos-lab`             | `projects/logos-lab`  | The application: routed pages (`<Name>Page`) and dialogs (`<Name>Dialog`) |
| `@logos-lab/components` | `projects/components` | Shared `ll-` components; each has a CRD in `docs/specs/components/`       |
| `@logos-lab/api`        | `projects/api`        | API contracts, injection tokens and HTTP implementations                  |

```bash
npm ci
npm start              # http://localhost:4200, /api proxied to http://localhost:3000
npm run lint
npm run format:check
npm run build
```

Acceptance tests live in `../e2e` (`npm ci && npx playwright test`). See
`docs/adr/0001-frontend-workspace-and-testing.md` for the workspace, styling and testing decisions.
