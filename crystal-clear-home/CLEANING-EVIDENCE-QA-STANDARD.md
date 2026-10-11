# CCH-STD-001 — Conversation-Based Cleaning Evidence & QA Standard

**Version:** 0.1 (draft for human approval)  
**Created:** 2026-10-11  
**Owner:** Crystal Clear Home / Crystal Clear Organization  
**POC issue:** https://github.com/atif-hafeez/Crystal-Clear-Web/issues/4  
**Related:** [Sprint 1](https://github.com/atif-hafeez/Crystal-Clear-Web/issues/2), [CCO delivery standard](../docs/CCO-AI-DELIVERY-STANDARD.md), [CCH provenance](./PROVENANCE.md)

## 1. Purpose and governing rule
Enable an **Executor** to document room-cleaning activity through a human–AI conversation (or an optional dedicated interface); enable an AI reviewer to guide and assess; enable a **Manager** to review evidence and decide whether to accept work. The conversation is the coordination center, not a substitute for secure durable records.

**Non-negotiable:** original visual evidence must not be reconstructed, visually improved, invented, swapped or presented with a false stage label. Presentation quality never overrides evidence fidelity. No AI-generated substitute may masquerade as an actual inspection photograph.

This standard governs capture, evidence handling, scoring, report production, QA, privacy and corrective action in prototype and future operational workflows.

## 2. Roles and boundaries
- **Executor (human):** starts activity, captures/identifies photos and provides factual execution notes; can correct the AI's interpretation. A person can hold multiple roles.
- **AI reviewer:** organizes evidence, explains visible observations, identifies uncertainty, recommends next steps, drafts labeled outputs and flags contradictions; cannot personally verify concealed surfaces, sanitation or labor time without evidence.
- **Manager (human):** reviews work and evidence, may request rework, approves or rejects final reporting and release.
- **System of record:** chat is working context; Google Sheets and access-controlled private Drive are *planned/defined* durable operational stores, only claimed as saved after successful verified write. Public GitHub holds text-only standards/issues; **no private household media by default**.

## 3. Provenance taxonomy
Record each significant assertion as one of:
1. **Established/observed evidence:** what an unaltered photo or verified system log visibly shows, with source ID and observation limits.
2. **Human statement/recollection:** what Executor/Manager reports (e.g., 'I mopped'), not independently proved by the image.
3. **AI interpretation/inference:** visual housekeeping estimates, observations requiring judgment, likely explanations and recommendations.
4. **Agreed decision:** human-approved scope, criteria and corrective instruction.
5. **Implementation/verification:** what was actually committed, executed, persisted or approved; explicit timestamps/results, never assumption.

A reported activity and visible result must not be conflated. Distinguish cleanliness appearance, task completion and hygiene/sanitation.

## 4. Session and evidence IDs
Use unique session/activity IDs and `Evidence_ID`s, e.g. `CCH-20261011-001` and `CCH-20261011-001-B01` (example convention; do not imply a backend issued them). Record:
- Activity_ID, room name/ID, Executor reference (private), role, STARTED/IN_PROGRESS/REVIEW/APPROVED/REWORK state.
- Evidence_ID, stage (**BEFORE**, **PROGRESS**, **AFTER**), original filename, source/location, capture timestamp *if actually available*, chat received timestamp if known, viewpoint/zone, original file hash when persisted, privacy class, storage URI *only when real*, annotation derivative ID, and reviewer notes.
- Assessment version, time, source list, qualitative score/rubric and uncertainties, Manager decision and reviewer identity/time when verified.
- Do **not** fabricate exact times, hashes, storage paths, worker names, or confirmations.

A session may have unequal numbers of BEFORE and AFTER photos. Label coverage gaps; avoid forced false pairings.

## 5. Capture and workflow
1. **Start:** identify room, purpose, scope, human operator and initial timestamp if verifiable.
2. **Before:** record original photographs showing whole-room overview and hotspots (floor, corners, behind furniture, worktops); classify state before cleaning. Ask for missing viewpoints rather than infer.
3. **Assessment:** list visible defects and safety priorities; explicitly flag inaccessible areas and pre-existing damage.
4. **Progress:** record additional original photos and human updates; do not silently replace baseline.
5. **After:** capture overview and representative matching angles, keeping people out of frame where practical; distinguish items actively in use from abandoned clutter.
6. **QA:** describe supported improvements, remaining shortcomings and potential risks; cite source Evidence_ID per notable finding. Mark hidden/untested areas NOT VERIFIED.
7. **Manager acceptance:** pass / pass with exceptions / rework / not assessed. Manager approval is a recorded human action, not AI confidence.

## 6. Immutable evidence and image production
- Preserve source photographs unedited and access-controlled. Editing/retouching source files is prohibited.
- For evidentiary reports, use only **actual source-photo pixels**. Permitted derivatives: faithful crop, rotate, resize, color-space conversion without deceptive changes, plus clearly distinguishable arrows/rectangles/circles/text **overlaid** on top. Keep original source retrievable and log derivative linkage and crop/view changes.
- Generative image tools MAY create standalone conceptual graphics, branding or layouts, but MUST NOT synthesize, reconstruct, inpaint, replace, rearrange or remove objects in a photograph labeled BEFORE/PROGRESS/AFTER. Use deterministic image composition for real photo panels.
- Each panel must state stage and Evidence_ID. Validate that every photo matches its caption and that before/after scenes represent the same location/view where comparison is claimed.
- Do not insert synthetic photos, decorative 'cleaned' scenes, or misleading composites into evidence panels; label illustration separately if used.
- Original evidence absent? Use a placeholder **'Original photograph unavailable — comparison not verified'**. Never invent the photo.

## 7. Scoring protocol (pilot, not calibrated)
- Rate **visible housekeeping condition**, not percentage of paid labor done or microbial safety. Identify the evidence stage and approximate coverage.
- Any percentages are **subjective experimental AI estimates**, not standardized KPIs until rubric is human-approved and tested across repeated sessions. Preserve prior score with its assessment version; do not retroactively overwrite.
- Suggested pilot dimensions for future testing: floor obstruction/debris, accessible surfaces, object organization, visible dust/stains, cable/physical safety, inaccessible gaps and photo coverage. Weights **not yet agreed**.
- Separate **pre-existing property damage**, persistent paint marks, legitimate household storage and child use from the Executor's responsibilities. Do not penalize without explicit scope and before/after support.
- Avoid false precision and unsupported causal claims: photos may indicate a cleaner appearance but cannot prove disinfecting, full mopping, behind-furniture cleaning, germ reduction or productivity.
- POC directional record (2026-10-11): ~30% BEFORE → ~45% PROGRESS → ~72% AFTER. These are earlier AI visual judgments, **not audited measurements**.

## 8. Two-page report contract
**Page 1: Summary / purpose / provenance** — conversation-first proof-of-concept purpose; stages; dated assessment; labeled scores and their limitations; *real original* before/after overview photos with IDs; concise observed change, pending Manager signoff.

**Page 2: Detailed QA & corrections** — supported completed improvements, residual items, safety vs cosmetic distinctions; original AFTER photos with non-destructive arrows/circles/labels, linked evidence IDs; reasonable actions; exceptions and limitations.

Report outputs may be PNG/JPEG/PDF, but the rendered report is a derivative, not the source of truth. Avoid distributing family or child imagery beyond authorized viewers. Don't assert it has been shared when merely generated.

## 9. Mandatory pre-release QA gates
- [ ] Confirm stage/source mapping of every report image against the original, not just the appearance of the composed report.
- [ ] Confirm no generative replacement, object relocation, unintended retouch or fabricated details in evidentiary panels.
- [ ] Verify viewpoints and chronological order; mark mismatched/absent comparisons.
- [ ] Verify every material claim is supported or labeled Human statement / AI inference / Unknown.
- [ ] Label score subjective, state assessment scope, and distinguish visual order from sanitation.
- [ ] Confirm all original evidence retained privately; no source image or identifying child details in public GitHub.
- [ ] Check annotation pointer accuracy, readable captions, score arithmetic and no false completion/persistence statement.
- [ ] Have human Manager review and approve final render **before** family circulation.
- [ ] Store QA outcome, defects, corrections and approval in session provenance.

**Any wrong-stage, reconstructed or invented evidence is a blocking defect** irrespective of report attractiveness.

## 10. Error handling and corrective action
When human review finds a mismatch: stop distribution; label defective version **REJECTED / SUPERSEDED**; preserve original prompt/output for controlled provenance without publicly exposing private media; document the observation and affected panels; re-map source IDs; rebuild using real pixels and deterministic overlays; verify; obtain new human approval. Do not silently fix images without recording the defect.

## 11. Pilot incident (2026-10-11)
- **Sequence:** human submitted 6 BEFORE photos, 3 PROGRESS photos, 5 AFTER photos; AI scored approx. 30 / 45 / 72; generated markup and a two-page family report.
- **Failure:** report page 1 purported BEFORE photo panels were rendered/reconstructed and did not faithfully represent the original clutter and furniture configuration.
- **Detection:** human compared the report to original evidence and re-supplied five original BEFORE photos; requested explanation and a new standard, not immediate re-rendering.
- **Disposition:** first report rejected as evidentiary record pending corrected original-photo composition. No corrected report or human acceptance claimed.
- **Lesson:** **evidence integrity before visual design**; human QA is an essential release gate.
- **Trace:** https://github.com/atif-hafeez/Crystal-Clear-Web/issues/4

## 12. Change control and open design questions
This v0.1 draft is a human-review candidate; not an approved policy. The conversation-first approach is being piloted alongside the earlier CCH SPA until human decides whether to retain, supplement or retire that interface. Pending: calibrated rubric, private evidence storage and retention, photo consent policy, authorized automation/persistence, repeat-session evaluation and Manager acceptance procedure. Changes require version, rationale, issue link and human approval.
