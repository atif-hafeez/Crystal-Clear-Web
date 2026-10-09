# Zaman Family DIRS — Development Provenance
Last updated: 2026-10-09
Issue: https://github.com/atif-hafeez/Crystal-Clear-Web/issues/1
Public dashboard source: dirs/zaman-family/index.html
Public dashboard URL (deployment to verify): https://atif-hafeez.github.io/Crystal-Clear-Web/dirs/zaman-family/

## Project identity
- Umbrella initiative: Digital Identity Studio (Crystal Clear Foundation)
- Product: Zaman Family Digital Identity Record Dashboard
- Personal academic DIRS proof of concept: dirs/academic-dashboard/ (separate, unchanged)
- Target presentation: Samsung living-room television browser. The dashboard is designed as a shared family surface.

## Dated activity and evidence
### 2026-10-08: antecedent
- Personal academic dashboard developed around Class 10 (2001) and Class 12 (2003) records.
- Concept extended toward personalized living-room infotainment rather than generic news/weather.
### 2026-10-09: family prototype
- Human request: create independent family dashboard with seven household members and relevant events.
- GitHub commit bcf5463355dfdc745be8bd7285f4424932648306 added dirs/zaman-family/index.html.
- UI contains shared home introduction, member cards, upcoming occasion, education, memories and living-room concept blocks.
- Initial occasion text stated uncertainty. Following human verification, public wording was made non-specific.
- GitHub commit cadd57b2032360daf0e088d3e71a85121972cc25 removed uncertainty while preserving exact birthday privacy.
- GitHub issue #1 created for scope, design plan, privacy and traceability.
- This provenance file committed as an additional change.

## Decisions, status and rationale
| Decision | Status | Origin / rationale |
|---|---|---|
| Separate personal and family dashboards | Implemented | Human scope distinction |
| Digital Identity Studio as project umbrella | Agreed naming | Human project organization |
| TV-oriented family view | Prototype | Living room is a shared space |
| First names only in public UI | Implemented | Privacy/data minimization |
| Exact birthdays excluded from public repository and page | Implemented | Explicit human privacy instruction |
| Family-tailored palette | Planned | Awaiting visual preferences and reference photos |
| Rotating photo slideshow | Planned | Needs consent and suitable private photo hosting |
| Gemini handoff | Prepared | Awaiting Gemini run and returned file identifier |
| Google Drive handoff | Planned / linked in issue | For structured human-readable AI cross-platform context |

## Evidence classes
Established: the named repository paths, issue and commit hashes. Public GitHub Pages rendering and TV-device compatibility still require validation.
Human recollection: desired family events and photo slideshow; context for using the TV.
Interpretation: slideshow and milestones could provide a useful shared family view.
Pending verification: photo rights/consents, Gemini file access, refresh automation, storage choice, and dashboard live availability.

## Architectural boundaries
This repository is PUBLIC. It is a presentation layer, not a private record store. Do not commit specific birthdays, children's school documents, portrait photographs, credentials, full private person records, or private model/file identifiers. Future private records require permissioned external storage and review before display.

## Handoff protocol for Gemini
1. Read the GitHub issue and this provenance file.
2. Use the Google Drive handoff document provided by the human.
3. Treat the family dashboard as a public prototype, not an authenticated family vault.
4. Propose improvements before changes; do not assume repository write access.
5. On each iteration record: dated instruction, explicit source, human decision, files touched, commit SHA, tests, result, and remaining unknowns.
6. Return actual Gemini document/file identifiers only after an actual file exists. Avoid fictitious IDs or publishing sensitive IDs in public Git.

## Next implementation milestones
- Clarify family's color preferences and slideshow photo consents.
- Plan wide-screen television layout and slideshow behavior.
- Decide public versus private information architecture.
- Validate TV browser rendering, timers, and content refresh.
- Integrate conversational update process after proper authorization.
