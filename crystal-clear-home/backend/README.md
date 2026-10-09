# Google Workspace backend integration — Sprint 1

## Decision
Keep the public **Crystal Clear Home** SPA separate from the **Zaman Family Dashboard**. Use IndexedDB only for local drafts/cache; Google Sheets is the shared activity system of record; private Google Drive stores photographic originals.

Provisioned workbook: https://docs.google.com/spreadsheets/d/17mG8Rx7T-hCf1-fkbJ90VVVcqI7F2EbFgkz7ZjhbxUo/edit

## Initial Apps Script implementation
Source: [Code.gs](Code.gs). Implements internal server-side services:
- `cchCreateActivity(verifiedContext,input)`
- `cchUploadEvidence(verifiedContext,input)`
- `cchCompleteActivity(verifiedContext,activityId)` (idempotent completion, stored Duration_Seconds)
- `cchListActivities(verifiedContext,query)` (date/room filters, bounded page size)
- `cchActivityDetails(verifiedContext,activityId)`

The `verifiedContext` argument is **not** proof of identity by itself; these functions must not be wired directly to client-submitted context. The authentication gateway must generate it after checking a legitimate session and loading effective role assignments from trusted storage.

## Setup sequence and checks
1. Open private Google Sheets workbook and create/open its bound Apps Script project (Extensions → Apps Script), or configure an appropriate stand-alone script.
2. Place the contents of `Code.gs` into the script project after review. For a standalone project set script property `SHEET_ID` to the workbook's ID; for a bound project it can use the active workbook.
3. Create a **private** Drive folder for photo evidence, set script property `EVIDENCE_FOLDER_ID` to its ID.
4. Implement a restricted invocation/authentication mechanism with server-side role checks; ensure neither demo username/password nor role from the browser is trusted. **Do not publish the script as an anonymous write endpoint.**
5. Decide how the public GitHub Pages client reaches that restricted gateway (CORS/redirect behavior, OAuth/session protection, secure photo reads). This connection is NOT implemented.
6. Test with a dedicated non-sensitive cleaning record and photos. Verify Activity_ID and Evidence_ID independently in Sheets and Drive. Exercise upload failure, retry, double completion, Manager filtering, immutable completion and large file restrictions.
7. Only after integration passes replace the preview adapter. Mark sync status explicitly (local/pending/saved/failed). Keep genuine endpoint access and tokens outside public repository.
8. Conduct Android, cross-device and Manager UAT; measure remote latency.

## Known constraints of this code revision
- Apps Script is **server source only**, not deployed; missing secure HTTP endpoint and real login/session verification.
- Upload uses base64 and assumes images up to 6 MB; mobile camera files may need resizing or chunking. The client currently permits 12 MB locally.
- Google Sheets and Drive do not support a single atomic transaction. Compensating deletion is best-effort; reconciliation and duplicate-upload idempotency require follow-up.
- Apps Script row scans are not indexed; pagination limits response size but not server scanning effort.
- Completion updates multiple spreadsheet cells under a script lock, not a true database transaction; robust failure recovery should be tested before production.
- Manager photo reading requires a separate **authorized photo-serving** implementation; exposing Drive IDs does not automatically provide image bytes.
- Users, UserRoles and password verifier/session handling are not yet implemented. No public-facing secure authentication exists.

## Provenance / testing
Sprint issue: https://github.com/atif-hafeez/Crystal-Clear-Web/issues/2 . This stage is **backend source committed**, not remotely integrated or accepted.
