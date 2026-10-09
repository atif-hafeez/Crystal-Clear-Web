# Crystal Clear Home — Sprint 1 UAT Plan (Draft for human review)

**Status:** Test specifications prepared from agreed requirements; not executed. **Human:** product priorities, observed acceptance, final sign-off. **AI:** BA, implementation, developer verification, UAT preparation, evidence logging. Do not equate code review with execution.

## Entry criteria
- Public SPA and role-specific views available.
- Restricted backend identity and Sheets/Drive integration provisioned.
- Developer unit/integration/system tests passed, with recorded evidence.
- No genuine home photographs exposed to public GitHub repository or anonymous visitor.

## Test cases
| ID | Role | Test steps | Expected result |
|---|---|---|---|
| UAT-001 | Executor | Sign in, select Living Room, start activity, capture 2 before photos, capture 2 after photos, complete | Exactly one completed Activity row; 4 Evidence rows and 4 private Drive originals linked by Activity_ID; immutable completed record |
| UAT-002 | Executor | Repeat UAT-001 for Kitchen | Same reusable workflow, new Activity_ID and correct Room_ID |
| UAT-003 | Executor | Start activity, select multiple camera photos, change SPA screen and return | Photos and pending activity state retained; explicit storage status visible |
| UAT-004 | Executor | Try to complete without after photo | Completion rejected; activity stays in progress |
| UAT-005 | Executor | Double-tap Complete or retry same request | Idempotent completion, one Completed_At_UTC and one fixed Duration_Seconds |
| UAT-006 | Manager | Sign in and retrieve today's activities | Read-only summary and filtered activity register, no modification actions |
| UAT-007 | Manager | Filter by room and date, inspect an activity | Only matching paginated records; correct before/after evidence references |
| UAT-008 | Executor/Manager | Use test account assigned both roles | Executor action screen and Manager read-only view accessible within one login |
| UAT-009 | Executor/Manager | Attempt to update completed activity | Backend rejects modification regardless of visible controls |
| UAT-010 | Executor | Interrupt network during photo upload then retry | Explicit error/retry state; no silent success or duplicate evidence |
| UAT-011 | Manager | Review completed session timing and monthly totals | Duration_Seconds stored as integer once; totals derived from stored seconds and displayed as time |
| UAT-012 | Executor/Manager | Compare the actual Google Sheet rows and private Drive originals | Stable Activity/Evidence IDs, no public family evidence links |
| UAT-013 | Executor | Reload browser while an activity is incomplete | Recovery behavior matches explicitly agreed policy; no false saved or lost-data assurances |

## Execution evidence register (fill during actual test)
Test ID | Build commit | Device/browser | Execution time | Actual result | Pass/Fail/Blocked | Evidence reference | Defect issue | Human acceptance
---|---|---|---|---|---|---|---|---

## Exit criteria
All critical flows passed or accepted with documented exceptions; no unresolved critical privacy/data-integrity defects; human reviews evidence and explicitly approves. Failed or blocked cases do not count as passed.

## Provenance
Draft generated from 2026-10-09 human–AI conversation and recorded sprint decisions. Test scenarios are AI-derived proposals pending human review; implementation and execution unverified.
