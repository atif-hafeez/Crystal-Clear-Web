# Crystal Clear Home — Sprint 1

## Current deliverable: public SPA QA preview
Source: `index.html`, `domain.js`, `app.js`. Role-oriented SPA: Login, Executor Home, Start, Activity, Manager Overview, Activity Register, Details. No separate TV-dashboard code.

**Test credentials (public demonstration only, not secure authentication):**
- Executor: `executor-demo` / `CleanDemo26!`
- Manager: `manager-demo` / `ViewDemo26!`

**Important:** These test passwords are explicitly public and do not grant server access. The preview is **not secure or connected to Google Workspace**. Never reuse these passwords for actual accounts. No real authorization is claimed.

The QA adapter uses **IndexedDB on the current browser and device**, including local staged image files. Refresh retains data while browser storage remains intact. Clearing site storage destroys these records. Neither photos nor activities reach Google Sheets or Drive yet. Sign in as Manager in **the same browser and device** to inspect today's status and photographic history. This validates UI navigation, not cloud integration.

## How to test now
1. Open the GitHub Pages app in Android Chrome (once Pages deployment is confirmed).
2. Sign in with Executor test credentials.
3. Start Living Room; take 1–3 before photos; remove an unwanted picture; take 1–3 after photos; complete.
4. Sign out. Sign in using Manager test credentials **on the same device/browser**.
5. Inspect Manager Home, select Living Room in Activity Register and view before/after images.
6. Capture defects with reproduction steps, Android/Chrome version, observed/expected results.

## Backend and publication gate
The agreed **system of record** is [Google Sheets](https://docs.google.com/spreadsheets/d/17mG8Rx7T-hCf1-fkbJ90VVVcqI7F2EbFgkz7ZjhbxUo/edit) with 7 tabs, and *private Google Drive* for originals. These are **not yet connected**; a restricted Google Workspace backend must be provisioned and deployed. Static GitHub Pages cannot safely validate passwords or directly write to private Workspace assets. Real identity verification, authorization, upload idempotency and read filtering must live at the backend. Do not put passwords, hashed password verifiers, service credentials or broad access tokens in public GitHub/JavaScript.

No true remote authentication, cross-device sync, Drive storage or Google API timings should be claimed until integration tests pass. Any real household photo used in this QA prototype is stored in browser-local IndexedDB; for privacy, test initially with non-sensitive photos, avoid shared browsers, and never regard local browser data as a backup.

## Requirements, quality and provenance
Sprint [#2](https://github.com/atif-hafeez/Crystal-Clear-Web/issues/2) · [UAT plan](UAT-PLAN.md) · [Data contract](DATA-CONTRACT.md) · [Provenance](PROVENANCE.md). Human acceptance outstanding.
