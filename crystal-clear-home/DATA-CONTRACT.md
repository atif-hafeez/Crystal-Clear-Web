# Crystal Clear Home — Sprint 1 data contract

Status: **proposed contract; not provisioned or integrated**. This is an independent operational web application, not part of the Zaman Family TV dashboard.

## Stores
- **Google Sheets** (private): `Rooms`, `ActivityDefinitions`, `Activities`, `Evidence` tabs. Use stable opaque IDs and application-level validation rather than enforcing physical database foreign keys.
- **Google Drive** (private): original photo bytes, with the file ID referenced from `Evidence`. Do not store photographs or Drive API credentials in the public Git repository.
- **GitHub Pages**: hosts static UI, never credential-bearing backend write operations.

## Proposed Sheet headers
| Tab | Fields |
| --- | --- |
| Rooms | Room_ID, Room_Name, Active |
| ActivityDefinitions | Definition_ID, Name, Revision, Active |
| Activities | Activity_ID, Definition_ID, Room_ID, Status, Started_At_UTC, Completed_At_UTC, Notes, Archived_At_UTC, Created_At_UTC, Updated_At_UTC |
| Evidence | Evidence_ID, Activity_ID, Stage, Drive_File_ID, File_Name, Mime_Type, Byte_Size, Captured_At_UTC, Uploaded_At_UTC, Archived_At_UTC |

`Stage`: before/after. `Status`: in_progress/completed/archived. The `Clean Room` definition is reusable across any `Room_ID`. One execution creates one `Activity_ID`. Every photo gets its own `Evidence_ID`. Times are ISO 8601 UTC. No destructive delete of evidence during PoC.

## Event flow
1. `createActivity(room_id, definition_id, notes)` → server allocates `Activity_ID`, writes Activities, returns authoritative record.
2. `uploadEvidence(activity_id, stage, original_photo)` → backend validates activity/stage/file, uploads to private Drive folder, appends Evidence row, returns Evidence ID and Drive file ID. On partial failure, record/reconcile orphaned uploads.
3. `completeActivity(activity_id)` → verifies at least one saved before and one saved after evidence record, stamps completed time.
4. `listActivities()` and `getActivity(activity_id)` → authorized read-only summary with limited photo access.
5. `archiveActivity(activity_id)` → soft archive with evidence preserved.

## Measured latency
Display wall-clock duration using browser `performance.now()` for each awaited real API request: creation, each image upload, completion and reading history. Include photo sizes, operation result, error type and timestamp. Browser-side measurements include networking and server time. Preview-only UI timings must never be labeled Sheets/Drive timings.

## Restricted integration required before genuine write tests
A public static site must not contain a reusable shared secret or a permanently anonymous unrestricted writer. Apps Script may be suitable **only if** its identity/permission model is tested and constrained. Alternative bounded integration may be required. Do not share underlying private Drive file links without suitable access. Maintain a separate production identity/authorization story.

## Acceptance test (human on Android)
Create a living room session, take 1–3 before photos from phone, clean, take 1–3 after photos, complete, refresh, then independently verify persisted Sheet rows and Drive originals with matching IDs. Repeat for kitchen using the same process. Capture timings, failures and eventual family feedback.
