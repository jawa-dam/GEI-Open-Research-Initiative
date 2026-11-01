# GEI Open Research Initiative — Claude Build Brief

Repository: https://github.com/jawa-dam/GEI-Open-Research-Initiative
Brand: Y'allToo / Genesis Engineered Interpretation
Research lead: Wilbert Bouie Jr.
Status: Greenfield repository (currently empty), default branch: main.

## Mission

Build a polished, mobile-first research portal inviting qualified and independent contributors to examine GEI, an alternative interpretive framework examining Genesis 1–6 through proposed linguistic, textual, hydraulic, water-management, archaeological, and mechanical-engineering comparisons.

Core message:
"A DAM TEAM OF GENIUS. SIX DISCIPLINES. ONE OPEN INVESTIGATION."
"You bring the expertise. We'll bring the blueprint."
"Challenge the blueprint. Agreement is not required."

Do not present GEI as academic consensus, an established Hebrew translation, proven ancient hydraulic technology, or confirmed archaeological discovery. Distinguish observation, analogy, hypothesis, evidence, and unresolved questions. Invite critical review and corrections.

## Product architecture: public site + secure researcher portal

Do NOT put the entire site behind login. The public website must explain the initiative, introduce six disciplines, provide public research materials, explain participation, and offer an application CTA. Authentication unlocks private profile, dashboard, submissions, review work, and collaboration functions.

Suggested routes:
- / — public landing page, mission, six discipline cards, process, research preview, FAQ, CTA.
- /research — public Evidence Room/research library.
- /disciplines — discipline invitations.
- /apply — initial interest/application form; do not require an account just to express interest.
- /sign-in and /sign-up — authentication.
- /dashboard — authenticated contributor home.
- /profile — contributor profile and visibility preferences.
- /submissions and /submissions/new — own submissions and new contribution form.
- /review — restricted reviewer queue.
- /admin — restricted administration, roles, moderation, status management.

Inspect deployment environment before choosing framework. Prefer TypeScript, accessible components, server-side authorization, maintainable architecture, and documented setup/deployment.

## Six discipline pathways

1. Hebrew scholars — THE LANGUAGE INVESTIGATION. CTA: EXAMINE THE HEBREW.
Invitation: Help distinguish linguistic evidence from linguistic speculation. Review Hebrew vocabulary, morphology, syntax, semantic range, context, proposed word associations, and departures from established scholarship. Explicitly distinguish Hebrew אָדָם (adam) from an English "A-DAM" sound association; do not claim English "dam" is the Hebrew etymology.

2. Biblical researchers — THE TEXTUAL INVESTIGATION. CTA: EXAMINE THE TEXT.
Review Genesis 1–6 literary structure, sequence, genre, translation choices, contextual interpretation, canonical context, alternative readings, and whether GEI mappings follow from the text.

3. Civil engineers — THE STRUCTURAL INVESTIGATION. CTA: TEST THE STRUCTURE.
Review physical coherence of the proposed containment system: foundations, dam/reservoir arrangement, outlets, channels, loads, materials, elevation, structural sequencing, and missing components. Conceptual diagrams are not historical proof.

4. Hydrologists — THE WATER INVESTIGATION. CTA: INVESTIGATE THE FLOW.
Review watershed logic, collection, drainage, water balance, storage, controlled release, flow direction, elevation/head, and whether proposed sequences resemble recognizable water-management principles.

5. Archaeologists — THE ANCIENT TECHNOLOGY INVESTIGATION. CTA: EXAMINE THE ANCIENT EVIDENCE.
Review securely dated evidence for ancient dams, canals, reservoirs, irrigation, mills, and water-control technologies. Evaluate chronology, geography, cultural context, and what physical evidence would be required. Do not imply an artifact supports GEI unless documented.

6. Mechanical engineers — THE MECHANICAL INVESTIGATION. CTA: TEST THE MECHANISM.
Review proposed waterwheel/mill connections, operating principles, flow and head requirements, power transfer, shafts/gearing, and mechanical plausibility. Keep proposed associations distinct from direct textual identification.

Include "Other / interdisciplinary" as an option.

## Authentication and security

Use a reputable provider appropriate to chosen stack (e.g. Auth.js or Clerk); explicitly document provider choice and environment variables. Do not hardcode secrets. Add .env.example with placeholders only.

Requirements:
- Verify sessions and authorization server-side on every protected page, action, and API.
- Roles: visitor (unauthenticated), member, reviewer, admin. New accounts default to member; reviewer/admin roles granted explicitly by admin. Never trust client-provided roles.
- Email verification for privileged contribution and account recovery flows.
- Secure provider-managed password/session handling; secure, HttpOnly, SameSite cookies where applicable.
- Rate-limit sign-in, registration, reset, applications, and submissions.
- Validate/sanitize inputs; protect against CSRF, XSS, injection, unsafe uploads.
- Restrict upload type/size; store outside public executable paths; scan where available.
- Do not collect DOB, home address, phone, government ID, or unnecessary sensitive data.
- Provide privacy notice and account deletion/request process.
- Keep emails and private submissions private.
- Audit role changes, moderation, and status transitions.
- Use least-privilege database access and server-only secrets.
- State that application does not itself verify credentials or imply institutional endorsement.

If provider/database credentials are not available, implement safe integration seams and setup docs. Never fake production auth with localStorage or hardcoded demo identities. Development mock only behind explicit development-only flag, impossible to enable in production.

## Researcher application

One shared application form; preselect discipline from the selected invitation. Fields:
- Name/preferred display name (required)
- Email (required; private)
- Primary discipline (required; six paths + other/interdisciplinary)
- Professional title/area of study (optional)
- Institution/organization (optional)
- Relevant expertise (text)
- GEI research question(s) of interest
- Contribution type: linguistic review, textual review, engineering analysis, hydrology review, archaeology sources, mechanical review, literature references, peer critique, discussion, other
- Website / ORCID / professional profile (optional)
- What would you examine, test, or challenge?
- Consent to be contacted (required)
- Separate optional consent for public attribution; unchecked by default.

Do not require institutional affiliation or credentials for an initial expression of interest. Offer a low-friction "follow the research" option.

Application states: received, under_review, accepted, waitlisted, declined, withdrawn. Display current status and next steps. No automatic acceptance.

## Contributor workspace

Submission types: question, critique, technical_analysis, source_reference, correction, collaboration_offer.
Statuses: draft, submitted, triage, under_review, response_requested, published, not_published, withdrawn.
Contributors can view/edit drafts and view their own submissions. Reviewers see assigned submissions. Admins can assign reviewers, moderate, and change status. Keep status history and timestamps.
Attribution choices: named, affiliation shown, anonymous. Each requires explicit consent; never publish contact details.
Do not promise peer review, academic certification, employment, compensation, or formal institutional affiliation.

## Public research library starter entries

Create transparent starter records (not fabricated finished scholarship):
- GEI-01 — The Adam/A-DAM Hypothesis: linguistic question, sound association, Hebrew evidence, objections.
- GEI-02 — Genesis 1–6 Textual Mapping: passages, sequence, method, alternative readings.
- GEI-03 — Mountain-to-Ocean Hydraulic Model: conceptual diagram, assumptions, water movement, feasibility questions.
- GEI-04 — Claims, Evidence & Open Questions: claim classifications, evidence, counterarguments, unresolved matters, version log.

Each entry supports: question, scope, biblical passages, source-language references, conventional/alternative readings, GEI proposal, evidence, counterarguments, test/weakening criteria, bibliography, version/date, review state. Mark missing content as "not yet supplied"; never fabricate citations or review status.

Link to:
- GEI publication: https://zenodo.org/records/17316846
- DOI: https://doi.org/10.5281/zenodo.17316845
- ORCID: https://orcid.org/0009-0008-1147-5913
- Y'allToo: https://yalltoo.com

## Visual direction

Professional research platform with distinctive Y'allToo engineering identity. Colors:
- cyan #2fd2ff
- blue #3d3dea
- magenta #f310ba
- soft pink #ff9df2
- near-black #06070d

Use restrained dark navy/blueprint surfaces, readable light-mode layouts, subtle grid/contour/flow-line motifs, carefully chosen water/engineering imagery, clear typography, and high-contrast CTA. Credible to academics and engineers—not a children's game or crypto dashboard. Beaver mascot optional and subtle. Avoid tiny text, excessive glow, and clutter. Mobile-first, accessible, keyboard navigable.

Hero:
"A DAM TEAM OF GENIUS."
"Six disciplines. One open investigation."
"GEI invites Hebrew scholars, biblical researchers, engineers, hydrologists, and archaeologists to examine an alternative reading of Genesis 1–6. Bring your expertise. Challenge the model. Help us document what the evidence does—and does not—support."
Primary CTA: EXPLORE THE RESEARCH
Secondary CTA: APPLY TO CONTRIBUTE

## Quality gates and delivery

- Inspect repo and deployment context; greenfield project.
- Build responsive frontend and real auth when provider configuration exists; never fake production auth.
- Add .env.example, setup guide, architecture/security notes, database schema/migrations, and transparent seed content.
- Tests: auth gates, role access, input validation, submission ownership, reviewer visibility, public/private data boundaries.
- Add accessibility checks, responsive QA, lint/typecheck/build scripts, CI if feasible.
- Add SEO title/description, Open Graph, sitemap/robots. Public materials crawlable; private dashboard noindex.
- Document development and deployment.
- Report exactly what works, what needs credentials, tests run/results, and blockers.
- Work on a feature branch and open a PR to main. Do not merge automatically.
