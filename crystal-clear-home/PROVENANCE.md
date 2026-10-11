# Crystal Clear Home — Development Provenance

## 2026-10-09 · Sprint 1 initiated
**Human requirement:** Build a separate mobile-first Crystal Clear Home application, publicly hosted by Crystal Clear Web, with reusable room-cleaning session steps: start, capture multiple before photographs, clean, capture multiple after photographs, complete, review. Use Google Sheets for records and Google Drive for photo evidence; stable IDs enable loose relationships; later feed a distinct TV dashboard. Test real mobile responsiveness and persistence latency.

**Implementation:** `index.html` and `app.js` provide initial interface-only proof of concept. Photo selection uses browser File objects and temporary object URLs; sessions are held in volatile memory for explicit UI validation. These do not persist, do not transmit, and are deliberately labeled as previews. No credentials or real family media included. Data contract documented separately.

**Verification performed:** GitHub create-file operations completed; browser QA, GitHub Pages endpoint verification, real Sheets/Drive integration and Android camera checks have **not** yet been performed.

**Open risks:** Public frontend access does not authorize unrestricted backend writes; photo storage requires restricted integration and retention policy. For genuine persistence testing, the user must approve/connect suitable Google Workspace assets and a bounded backend. Human production acceptance remains pending.

**Trace:** Sprint issue https://github.com/atif-hafeez/Crystal-Clear-Web/issues/2 ; initial commits `dad0c1bd3214bf1f4233d57c72024c0b84b5518c`, `77f0a887dddeb991cc0f41e85ce0ef932c63cacf`.

## 2026-10-09 · Domain vocabulary and collaborative provenance
**Human instruction:** Use role-specific language: **Executor** performs cleaning, uploads before/after evidence and completes the activity; **Manager** views and reports on saved activities. Avoid saying generic 'user' when referring to role-specific behavior. Human–AI design discussion itself provides rationale and provenance.

**Clarification:** `User_ID`, `Users` and `UserRoles` remain valid names for identity data because a person can possess multiple roles. Role-based UI guidance is not a claim that authorization has been implemented.

**Verification:** Documentation updates only; no app behavior or backend integration changed.

## 2026-10-09 · Cross-project engineering knowledge synthesis
**Human recollection:** Stephen emphasized efficiency, code reuse, small functions, simplicity and refactoring in earlier real-time C application development. The human recalls a tool name sounding like 'Z binder', not independently identified. The human's own ATCS migration checklist and Power Apps experience informs workflow tracking, business roles, KPIs and UAT.

**AI interpretation:** Crystal Clear Home brings lessons from distinct people/projects/periods into a conversationally developed architecture. Reuse modules pragmatically rather than force OOP classes; preserve behavior with regression tests. Conversational acceleration of analysis/documentation is not evidence that the delivered application meets its acceptance criteria.

**Provenance status:** This entry preserves conceptual rationale and distinguishes memory from verification. No new functionality or test execution is claimed.

## 2026-10-09 — Role journey MVP and staged photo management
**Human requirement:** Public-facing Crystal Clear Home SPA with two test personas: Executor starts a Living Room session, takes multiple before/after photos, removes unwanted previews before completion and saves; Manager signs in and sees today's completion status by room, activity history and full before/after evidence drilldown. Prioritize the normal happy path, real mobile testing, Google Sheets/Drive data traceability and reproducible UAT. UI uses role-based language and separate operational application from TV dashboard.

**Implemented source:** `index.html` SPA views, `app.js` preview adapter using browser IndexedDB including photo blobs, `domain.js` testable rules, `tests/domain.test.cjs`, `README.md` with published demo credentials and explicit safety notice. UX includes before/after previews with Remove before completion, local activity history and today's room-completion summaries. The two publicly disclosed passwords are merely client-side preview gates; **not real authentication**. No Google credentials or private photos in repository.

**Data provisioned:** Google Sheets workbook with tabs Rooms, ActivityDefinitions, Activities, Evidence, Roles, Users, UserRoles: https://docs.google.com/spreadsheets/d/17mG8Rx7T-hCf1-fkbJ90VVVcqI7F2EbFgkz7ZjhbxUo/edit . Master room, activity definition and role sample rows inserted. **No live application backend is connected to Sheets or Drive**. A Drive evidence folder and real storage integration remain outstanding.

**Verification:** GitHub write responses succeeded; deployment reachability was not confirmed using web retrieval; Android Chrome UI/UAT and test execution remain NOT TESTED. Domain tests exist but have not been independently executed in this session. Do not claim the requested Google Workspace-connected end-to-end scenario passed.

**Outstanding:** Provision restricted backend with server-side auth, write/read data persistence, Drive uploads, idempotent retries, actual upload timing, deployed Pages verification, end-to-end tests and human sign-off. No security-sensitive service credentials may be placed in the public frontend.

## 2026-10-09 — Google Workspace persistence adapter started
**Human decision:** Google Sheets/Drive remains the shared, browser-accessible operational system of record. IndexedDB is useful for responsive local drafts but cannot support cross-device Manager review or direct conversational Workspace retrieval. Develop Apps Script backend integration.

**Implementation:** Added `backend/Code.gs` internal Google Apps Script services for Executor activity creation, private Drive photo evidence uploads with Sheet references, idempotent completion with stored Duration_Seconds, and Manager filtered activity retrieval/details. Added `backend/README.md` deployment and authorization requirements. Commits: `af9f1ce2183a0674496e4c9facd8c2b8cd6bc186` and `11a89416046de89f2f317d6e2d52a3e23638fa6a`.

**Not implemented or verified:** Apps Script deployment, real server-verified authentication, cross-origin client API integration, private photo reads, duplicate-upload reconciliation, actual Drive/Sheets writes, performance tests, cross-device UAT. Backend source is not proof of successful persistence. Avoid exposing an anonymous unrestricted Apps Script endpoint from the public site.


## 2026-10-11 — Conversation-centered household cleaning POC and evidence-integrity defect
**Human requirement / architecture exploration:** Instead of requiring a purpose-built cleaning SPA for all steps, use the conversational AI window as the stable operating center: Executor supplies images/context, AI provides interim evaluation and structured QA, Manager retains approval. Sheets/Drive persistence remains a separately verified capability, not an automatic chat behavior. This POC does not itself decommission or implement existing Sprint 1.

**Established visual evidence (private conversation; not committed):** 6 initial BEFORE photographs document floor clutter, bed-wall gap bottles, blocked equipment, crowded desk and TV unit; 3 PROGRESS photographs show partial floor clearing with remaining debris; 5 AFTER photographs show a more usable floor and neater zones but remaining tabletop objects, cables, wall marks and scattered items. The human later re-supplied 5 original BEFORE photographs for verification.

**AI inference, not formal measurement:** visually estimated condition scores ~30% BEFORE, ~45% PROGRESS and ~72% AFTER; qualitative condition 'cleaned and functional'. No claim of sanitation, verified thorough mopping, measured labor duration or calibrated scoring.

**AI-produced output and detected defect:** AI first generated marked-up feedback and a two-page family report. During human review, human identified fabricated/reconstructed or mis-staged BEFORE imagery in page 1, not faithful to original photos. Human instructed no further visual at that stage and required the error to be recorded in a standard. The existing two-page report fails evidence QA and must not be circulated as verified before/after proof.

**Corrective decision / draft documentation:** original image fidelity outranks presentation; only actual source pixels with faithful crop/resize/non-destructive markup are admissible as photo evidence. Mark wrong-stage/synthetic evidentiary panels as blocking defects, preserve source-to-panel IDs, label statement vs observation vs AI inference, and require human final acceptance. Draft standard: [CLEANING-EVIDENCE-QA-STANDARD.md](./CLEANING-EVIDENCE-QA-STANDARD.md). Issue: https://github.com/atif-hafeez/Crystal-Clear-Web/issues/4 .

**Verification/status:** Issue and Markdown standard committed. No private images uploaded to public GitHub; no verified Google Sheets/Drive persistence. Revised two-page original-photo report and human sign-off remain pending.


## 2026-10-11 — Independent consultation, challenge, reassessment, Manager approval
**Source provenance:** Manager shared an initial independent DeepSeek consultant review of the living-room POC; ChatGPT critiqued it after consultation with Manager; Manager forwarded that critique; DeepSeek issued a revised consultant reassessment; Manager explicitly approved the reassessment. Original full conversation stays in chat; public repository records text-only summary and decision.

**Initial DeepSeek critique:** invisible ad-hoc scoring rubric, insufficient structured operational data and an imprecise allegation of missing human verification; proposed domain-specific Kitchen/Bathroom rubrics and reused visuals. Material omissions: fabricated BEFORE photo representations in generated report and demonstrable human correction; inaccurate Dubai-specific regulatory assumptions; wording that treated consultant advice as phase authorization.

**ChatGPT review after human consultation:** insisted on documenting visual-evidence failure; distinguished human verification-in-practice from predetermined acceptance gates; separated visual cleanliness / task scope / conditions outside cleaner control / hygiene not verifiable by photo; distinguished persistent records from JSON; reinforced conversation-first architecture, UAE federal + Sharjah jurisdiction and exclusive human approval authority.

**DeepSeek reassessment:** accepted critiques, withdrew Dubai Montaji assumption for Sharjah, narrowed validation claim to conversational interaction (not inspection system), identified source-photo integrity failure as most significant incident, and proposed source-photo signoff before scoring, defined task scope, four-part rubric, provenance separation and concise decision log. Independent consulting remains advisory.

**Human decision CCH-DEC-20261011-001 (APPROVED):** Manager expressly approved the **DeepSeek reassessment** as reviewed findings and future governance direction. This is not approval of the originally defective report, a new Kitchen/Bathroom launch, production readiness, or proof the safeguards exist. Issue #4 remains open until technical QA/acceptance work is completed.

**Artifact:** [Review challenge, reassessment and decision log](../docs/CCH-INDEPENDENT-REVIEW-2026-10-11.md). **Operational gap:** no verified photo hashes or source-set signoff, no agreed/calibrated room rubric and no durable cloud cleaning data records established by this POC.
