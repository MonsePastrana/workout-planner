Week 4 - Marketing Engine + Content System
Project and current status
- Project: Workout Planner.
- Required route: /marketing.
- Existing routes to preserve: /, /core, /research, /product, /pricing, and /docs.
- Planned live page: https://workout-planner-lilac-six.vercel.app/marketing
- Repository: https://github.com/MonsePastrana/workout-planner
- Status: written implementation plan; most functionality and evidence are still pending.
Process note
An initial visual prototype for /marketing was created locally before this written packet was completed. The student reported completing that step. This document records the plan for the remaining work; it does not claim that all planning happened before all coding. A documentation-first commit does not change that chronology.

The visual mockup, implementation evidence, tests, and deployment checks must be recorded when they actually exist. No result in this document is a claim that a test has passed.
1. Problem
Workout Planner helps people create workout routines, but it needs a stronger marketing strategy to attract new users and explain its benefits.

The project needs an organized way to prepare promotional content, plan campaigns, and compare marketing messages. This module will improve the homepage and introduce a marketing dashboard to organize, copy, export, test, and save marketing assets.
2. User
Primary dashboard user: the project creator or marketing content manager who prepares and organizes Workout Planner campaigns.

Primary campaign audience: Students & Young Adults who want simple, affordable, flexible workout planning.

Secondary campaign audience: Busy Professionals who need convenient planning around limited free time.

Proposed target persona: Alex, a university student balancing classes and other commitments, wants a clear way to plan workouts around available time. Alex is a fictional planning persona, not a research participant or a validated customer profile.

Existing product segments remain unchanged. Coaches & Personal Trainers are not being added as a new official segment in this module.
3. Success
By the end of the module:
- The improved homepage and /marketing load on the stable deployed site.
- The dashboard contains a brand system, target persona, landing-page copy, 10 social posts, 3 video scripts, and a 14-day campaign calendar.
- Users can copy and export prepared content.
- Users can compare two headline variants using clearly identified input data.
- Authorized saving and retrieval of marketing assets work through Supabase.
- Two A/B tests and at least three software tests have documented methods and real results.
- At least one improvement follows testing and is verified after a new deployment.
- Existing modules remain usable.
These are acceptance targets, not completed results.
4. UX concept
Preserve the existing purple, white, and neutral visual identity. Use readable typography, clear headings, visible button states, and responsive cards. Avoid complex animations and new UI libraries.

Proposed page layout:
Header: Workout Planner | Home | Marketing
Introduction: Marketing Studio and content-source disclosure
Brand system and target persona
Content controls: audience and content type
Landing-page copy
Content cards: 10 social posts and 3 video scripts
Campaign calendar: Day 1 through Day 14
Headline A/B comparison and evidence fields
Saved marketing assets
Status, validation, and error messages
Each content card will display its type, audience, title, and text, followed by copy, export, and save controls where applicable. Buttons must provide feedback rather than silently failing.
Visual mockup prompt
Create a clean desktop and mobile UX mockup for Workout Planner Marketing Studio. Preserve a purple-and-white identity. Include brand identity, a fictional student persona, audience and content controls, prepared social-post cards, video-script cards, a 14-day calendar, a two-variant headline comparison, and saved assets. Include empty, loading, success, and error states. Clearly label any sample figures as demo data. Keep the design practical to implement in the existing Next.js and Tailwind application without additional UI libraries.

Mockup evidence: PENDING. This prompt and the text wireframe are not a generated image. Add the actual image and an implementation note before continuing feature implementation.
5. Scope cuts
This module will not include paid AI APIs, automatic social posting, paid advertisements, payment processing, a full analytics platform, or production-grade marketing automation.

Prepared or template-based content will be identified honestly. The interface will not claim to call a live AI model when it does not.

Do not implement the Week 5 chatbot in this module. Do not advertise Progress Tracking as a completed feature or invent testimonials, user counts, training outcomes, or business results.
6. Product specification and acceptance criteria
ID	Requirement	Acceptance criterion
AC01	Homepage upgrade	Explain the product, show its benefits and how it works, retain working links to existing modules, and link to /marketing.
AC02	Brand system	Show mission, voice, value proposition, visual palette, and typography guidance consistent with the current design.
AC03	Target persona	Show the primary persona's goals, needs, and barriers; explicitly identify invented persona details as assumptions.
AC04	Landing copy	Include a headline, supporting text, benefit statements, and a working call to action to /core.
AC05	Social posts	Provide 10 distinct posts, each with an ID, audience, channel, caption, and call to action.
AC06	Video scripts	Provide 3 distinct scripts with a hook, suggested scenes or spoken text, and a closing call to action.
AC07	Campaign calendar	Display 14 unique, ordered days with a channel, action, and related content reference where relevant. Include a review day instead of inventing an extra asset.
AC08	Copy and export	Copy the selected content and export readable text. Show success only after the operation succeeds; handle failure clearly.
AC09	A/B comparison	Accept two headlines and valid counts for each variant, calculate click-through rates, and distinguish a tie, no data, and an observed difference.
AC10	Saved assets	Save an authorized asset with a title, type, content, and creation time; retrieve it after refresh and show genuine loading/error states.
AC11	Accessibility and regression	Support keyboard controls, labels, readable mobile layouts, and navigation to previous modules without breaking them.


A/B calculation rules
- Click-through rate = clicks / impressions * 100.
- Counts must be nonnegative integers; clicks cannot exceed impressions.
- With zero impressions, show "No data" rather than divide by zero.
- Equal observed rates produce a tie.
- A higher observed rate is not automatically a statistically proven winner.
- Demo counts and real participant/traffic counts must be clearly distinguished.
- Never turn an AI preference, readability score, or invented count into experimental evidence.
7. Architecture and data flow
Public visitor -> improved homepage -> existing workout generator
                                  -> marketing dashboard

Marketing dashboard -> prepared content and local UI state
                    -> copy/export in the browser
                    -> validated headline comparison
                    -> authorized Supabase save/read
                    -> saved-assets list
Proposed implementation files, subject to inspection before editing:
- app/page.tsx: homepage improvements.
- app/marketing/page.tsx: dashboard and interaction states.
- lib/marketing-content.ts: typed, prepared content and calendar entries.
- lib/marketing-utils.ts: pure validation and comparison helpers if separation improves clarity.
- Existing lib/supabase.ts: inspect and reuse where compatible; do not replace it blindly.
- WEEK4.md: plan, evidence references, and actual results.
Proposed database record
Table name: marketing_assets.

Proposed fields: id, asset_type, title, content, created_at, and an owner/session association when required by the verified access model.

Store only marketing material needed for this assignment. Do not store passwords, private contact information, or workout health details.
Security and configuration gate
Before writing the persistence code, inspect the current project's authentication and policies. Define the authorized writer and saved-record visibility explicitly. Do not invent a working authentication setup or grant unrestricted public writes by assumption.

Enable Row Level Security and narrowly scoped read/insert permissions appropriate to that access model. Enforce types and length limits in the database as well as the interface. Do not disable RLS to fix a save error. Keep secret or service-role keys out of browser code, screenshots, and commits. See technical references below.

The permission design must be finalized and documented before deploying saving. This written plan does not claim that database setup is already complete.
8. Tech stack
Technology	Planned use
Existing Next.js and React installation	Routes, pages, and interactive components.
TypeScript	Types and validation logic.
Tailwind CSS v4	Styling consistent with the current project.
Supabase	Authorized persistence of marketing assets.
Git and GitHub	Separate, meaningful development commits.
Vercel	Deployment and live verification.
Browser APIs	Copy and downloadable text export.


Keep the existing dependency versions and lockfile unless a verified issue requires a documented change. Inspect the repository's AGENTS.md and installed Next.js guidance before changing application code. No paid API is required by this design.
9. DevOps and evidence plan
Five planned commits
1. docs: add Week 4 marketing build plan
2. feat: upgrade homepage and add marketing studio shell
3. feat: add marketing content with copy and export
4. feat: add campaign calendar and headline comparison
5. feat: persist marketing assets and document verified tests
This is the intended sequence, not an existing commit history. Add a further meaningful fix commit if testing requires it rather than hiding work or inventing evidence.

Only stage the files intended for each commit. Never commit .env.local, credentials, or unrelated changes. Record actual hashes after successful commits.
Deployments
Record at least two successful feature deployments. Plan the first functional checkpoint after the content, calendar, and comparison implementation. Record the final checkpoint after persistence, testing, and at least one verified improvement.

For each deployment, capture its actual commit, status, URL, and checks. A documentation-only deployment is not proof that /marketing works. Use the stable project URL for submission and deployment-specific URLs only as evidence.

Use existing environment-variable names only after verifying them. Do not publish credential values.
Required final evidence
- Written Build Discipline Packet and honest process chronology.
- Generated UX mockup and implementation note.
- Product specification and architecture sketch.
- At least 5 actual Week 4 commits.
- At least 2 successful, verified deployments.
- Supabase table/policy evidence and a verified saved record.
- At least 5 actual coding prompts, with tool, request, outcome, and associated change.
- 2 A/B tests and at least 3 software tests.
- Iteration log documenting an actual issue or improvement and a retest.
- Human Decision Note of 150-250 words.
- A 2-3 minute live demo video.
- One final submission document with live-site, repository, and video links.
The assignment specifically names a Codex/Claude prompt log. Code supplied in this ChatGPT conversation must be attributed to ChatGPT. A prepared prompt is not proof of execution in Codex or Claude. Obtain the required agent evidence or explicit instructor acceptance of a substitute; do not silently relabel this conversation.
10. Test plan
A/B test 1 - Students & Young Adults
Compare a flexibility-focused headline with a simplicity-focused headline while keeping the supporting content and call to action consistent. Define the audience, exposure procedure, observation period, and outcome before collecting data. Record actual impressions and clicks for each variant and document limitations.
A/B test 2 - Busy Professionals
Compare a schedule-focused headline with a planning-focused headline using the same documented procedure. Record both variants, real counts, observed rates, and a reasoned conclusion.

Do not claim causal or statistically significant results from tiny or uncontrolled samples. Simulated data can test the calculator, but it is not evidence of real audience behavior. Actual A/B evidence remains pending until tests are conducted.
Software test 1 - Content and usability
Verify navigation, 10 posts, 3 scripts, 14 calendar days, audience/type controls, keyboard operation, mobile layout, copy success/failure, and readable text export. Check that existing module links still work.
Software test 2 - Persistence and failure handling
With the documented authorization setup, save an asset, confirm the database row, refresh, and retrieve it. Verify empty-title rejection, database/network error handling, and prevention of repeated submissions while saving. Check that unauthorized access does not expose records outside the intended policy.
Software test 3 - Comparison validation
Check known arithmetic, zero impressions, ties, negative counts, decimals, empty headlines, and clicks greater than impressions. Confirm that invalid inputs cannot be used as a valid result. Run the repository's build and lint commands and record actual output.
Test evidence format
For each test, record: ID, date, environment, steps, inputs, expected result, actual result, pass/fail, evidence, and any follow-up fix.

All planned tests: NOT RUN in this document.
11. Prepared coding-agent prompt
Status: prepared, not executed as a Codex/Claude task.
Act as the coding partner for the existing Workout Planner repository. Inspect the current files, AGENTS.md, package versions, installed framework guidance, and this plan before editing. Implement only the agreed Week 4 scope in small, independently testable steps. Preserve all previous modules and the current visual identity. Upgrade the homepage and implement /marketing with a brand system, fictional target persona, landing copy, exactly 10 social posts, 3 video scripts, a 14-day calendar, copy/export controls, and a validated two-variant headline comparison. Use prepared content without paid AI APIs and disclose its source honestly. Before adding storage, finalize and document the actual Supabase access model, RLS, and validation; never introduce unrestricted public writes or expose secret keys. Add saved-asset retrieval and honest loading/error states. Supply exact file paths and complete paste-ready code for each agreed step. Run or request verifiable build, lint, and behavior checks. Log actual prompts and outcomes. Never invent a test, commit, deployment, user, conversion result, or screenshot. Stop for the student's local verification after each implementation step. Do not implement Week 5 yet.

Evidence tracker
Evidence	Current status
Written plan	Prepared in this file; Git commit pending.
Initial visual prototype	Student reported local completion; not independently verified.
Generated mockup	Pending.
Final storage access design	Pending inspection before persistence implementation.
Week 4 commit hashes	Pending.
Feature deployments	Pending verification.
Coding-agent prompt log	Pending actual evidence.
A/B tests	Not run.
Software tests	Not run.
Iteration and retest	Pending.
Human Decision Note	Pending real implementation decisions.
Demo video	Pending.


Technical references
- Git, committing selected paths: https://git-scm.com/docs/git-commit
- Supabase, Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase, API key handling: https://supabase.com/docs/guides/getting-started/api-keys
Assignment requirements in this plan come from the student's supplied Week 4 screenshots. Technical references are not evidence that the planned functionality has been implemented.