# Module 6 — Build Plan (pre-implementation)

Project: Workout Planner (`MonsePastrana/workout-planner`)

## Verified baseline (repository audit, November 15, 2026)

- Existing app routes: `/`, `/core`, `/research`, `/product`, `/pricing`, `/marketing`, `/chat`, `/docs`.
- `/demo` and `/dashboard` do not yet exist on the inspected `main` branch.
- `/docs` currently contains a placeholder.
- Technology versions in `package.json`: Next.js 16.3.2, React 19.2.8; TypeScript and Tailwind CSS.
- `core_outputs` and `research_outputs` use the generic Supabase client, with no user filter visible in the client-side SELECT queries. Row-level security policies for these tables have not been verified.
- Chat test summaries and marketing assets use *separate* anonymous-auth storage keys, not one shared guest session. Each storage helper filters by its own authenticated user id.

## Safe implementation sequence

1. Publish this audit and a verbatim prompt log as a planning commit.
2. Create `/demo` with a guided walkthrough linking only to existing destinations.
3. Update navigation and `/docs` with actual prompt history, architecture map, viability notes and a realistic roadmap.
4. Verify Supabase ownership and row-level security before creating a `/dashboard` that displays personal data; do not combine unscoped records as if they belonged to the active user.
5. Test every previous module, collect feedback from five real external users in total, then implement and retest at least one change arising from those findings.
6. Record at least five real commits, two successful Vercel deployments, and a five-minute demo video.

## Current constraints

The connected GitHub integration has read access to this repository but **not write access** (`push: false`). The proposed code is a local deliverable, **not a GitHub commit or a deployment**. A production build was not run in this environment, because the complete repository and its dependencies were not available locally.
