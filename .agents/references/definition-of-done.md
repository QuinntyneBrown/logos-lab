# Definition of done

The standing bar every increment clears before it is committed as done.

- [ ] The change has a requirement, a detailed design and (for UI) a mock, and they agree with the code.
- [ ] Its acceptance test was written first and seen to fail for the expected reason.
- [ ] Backend: the integration test suite passes.
- [ ] Frontend: lint, format check and the production build pass.
- [ ] E2E: the Playwright suite passes (Chromium only); visual baselines changed only for an
      intentional design change.
- [ ] No selector appears in a test; page objects own the DOM.
- [ ] No architecture tests were added.
- [ ] Tokens are read by role, never by value.
- [ ] Docs and ADRs touched by a resolved conflict are updated in the same change.
- [ ] The change is committed with a descriptive message.
