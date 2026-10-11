# Verify email

## Overview

Registration (`accounts/register-account`, `L2-006`) creates an account in the Unverified state and emails a verification link. This feature completes that step. It proves that the owner controls the address, and it keeps unverified accounts from contributing until they do.

**verification link** — single-use link, valid for 24 hours, that carries a random token proving control of an email address

**contribution action** — action that adds to the platform or to another member's experience: enrolling, commenting, registering for events and messaging

**contribution gate** — server-side check that refuses a contribution action from an Unverified account

An Unverified member may sign in and browse. Each contribution action shows a prompt to verify, with a "Resend email" button. Opening a valid link makes the account Active. An account left unverified for 30 days is deleted by a nightly job. The feature belongs to the accounts subsystem and shares its token store with password reset and email change.

## Description

**Screens (Logos Lab Web)**

- **`VerifyEmailPage`** — routed page at `/verify-email?token=…`, built on `ll-auth-card`, `ll-button`, `ll-empty-state` and `ll-alert`. Opening the link does not verify by itself; one "Confirm my email" button posts the token, so link scanners cannot use it up. The mocks in `docs/mocks/pages/verify-email/` cover `default`, `loading`, `success`, `expired`, `resend-sent`, `cooldown` and `error`.
- **`VerifyEmailPromptDialog`** — CDK dialog built on `ll-dialog`, opened when an Unverified member tries a contribution action. It offers "Resend email". The mocks in `docs/mocks/dialogs/verify-email-prompt/` cover `default`, `busy`, `success`, `cooldown` and `failed` (daily limit reached).
- **`ll-account-banner`** — banner below the header for an Unverified member, with "Resend email". The mocks in `docs/mocks/notifications/account-banner/` cover `warning`, `info`, `success` and `persistent` (the deletion date).
- **`VerificationGateService`** — web service that intercepts a `403` problem of type `email-unverified` and opens `VerifyEmailPromptDialog`.

**API contract (shared API library)**

- **`AuthApi`** (token `AUTH_API`, implementation `HttpAuthApi`) — `confirmEmail(token)`, `resendVerification()` for a signed-in Unverified member, and `resendVerificationForToken(token)` for the expired-link page.
- **`ResendResult`** — `sentTo`, `retryAfterSeconds`, `remainingToday`.

**Endpoints (Logos Lab API)**

- **`POST /api/v1/auth/email-verifications`** — anonymous. Body `{ token }`. Answers `204` on success and `410` with problem type `link-expired` for an expired, used or unknown token.
- **`POST /api/v1/auth/email-verifications/resend`** — authenticated Unverified member, or anonymous with the expired token in the body. Answers `200` with `ResendResult`, or `429` with `Retry-After` inside the cooldown or past the daily limit.

**Application and domain (Logos Lab API)**

- **`VerifyEmailAction`** — consumes the token through `AccountTokenService` and moves the `User` from `Unverified` to `Active` in one transaction. A token is marked used, so it can never be used again.
- **`ResendVerificationAction`** — applies the resend limits through `VerificationEmailThrottle`, invalidates earlier unused verification tokens, issues a new 24-hour token and enqueues `EmailSendJob`.
- **`VerificationEmailThrottle`** — keeps the time of the last email and a 24-hour count per account in the cache.
- **`VerifiedAccountPolicy`** — contribution gate used by the actions for enrolling, commenting, event registration and messaging. It refuses an Unverified account with `403` and problem type `email-unverified`.
- **`UnverifiedAccountCleanupJob`** — nightly Worker job. It deletes each account that has stayed Unverified for 30 days, with its personal data. Each run is idempotent.
- **`AccountToken`** (table `account_tokens`, purpose `EmailVerification`) and **`User`** (table `users`) — from `accounts/register-account`.

**Rules from the acceptance criteria**

- A link opened within 24 hours makes the account Active, and the link can never be used again.
- A link older than 24 hours or already used shows the expired state and offers a new link.
- An Unverified member can browse; every contribution action shows the verify prompt with "Resend email".
- Within 60 seconds of the last email, "Resend email" is disabled and shows the seconds remaining. No more than 5 emails go to one account in 24 hours.
- An account unverified for 30 days is deleted with its personal data when the nightly cleanup job runs.
- The verification endpoints also fall under the brute-force protection of `L2-009`; their per-IP limit is `<TO SUPPLY>`.

## Requirements

The feature realizes the following level-2 (L2) requirement.

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-007` | `L1-002` | **Email verification.** A new account shall verify its email address before it can contribute anything (enrol, comment, register for events, message). |

## Diagrams

### System context

The member opens the link from an email that Logos Lab sends through Amazon SES.

![C4 system context for verifying an email address](diagrams/c4-context.png)

### Containers

Logos Lab Web posts the token to the Logos Lab API. The API keeps the resend counters in the cache, and the Worker sends email and runs the nightly cleanup.

![C4 container view for verifying an email address](diagrams/c4-container.png)

### Components

`VerifyEmailAction` and `ResendVerificationAction` share `AccountTokenService`. `VerifiedAccountPolicy` is called by every contribution action, and `UnverifiedAccountCleanupJob` runs in the Worker.

![C4 component view for verifying an email address](diagrams/c4-component.png)

### Class structure

The page and the prompt dialog depend on the `AuthApi` contract. The actions use the token service, the throttle and the user repository.

![Class diagram for verifying an email address](diagrams/class-structure.png)

### Behaviour — confirm the email address

The page posts the token only when the member presses the button. A valid token activates the account and is marked used; an expired or used token shows the expired state.

![Sequence diagram for confirming an email address](diagrams/sequence-confirm.png)

### Behaviour — contribution gate and resend

A contribution action from an Unverified account is refused with `email-unverified`, and the prompt opens. "Resend email" honours the 60-second cooldown and the limit of 5 emails in 24 hours.

![Sequence diagram for the contribution gate and resending the email](diagrams/sequence-gate-and-resend.png)

### Behaviour — nightly cleanup

The nightly job deletes accounts that have stayed Unverified for 30 days.

![Sequence diagram for the unverified account cleanup job](diagrams/sequence-cleanup.png)
