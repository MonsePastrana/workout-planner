# Module 6 — Original Coding Prompt Log

This file preserves the original initial coding prompt prepared in the Module 6 planning conversation, **verbatim**. Later coding prompts should be appended here exactly when used, together with a date, purpose, result, and related commit SHA (once a real commit exists). No commit or deployment is claimed by this log.

## Prompt 1 — Initial implementation brief (prepared before coding)

**ROLE:**

You are my disciplined AI-native product architect and coding partner.

**COURSE RULE:**

Do not let me code before the plan is clear.

**TASK:**

Develop Module 6: Integrated Agentic Venture + Impact & Viability for the existing Workout Planner application.

**REQUIREMENTS:**

- Review the existing project structure and reuse the previously implemented modules.
- Integrate all existing features through consistent navigation without breaking their functionality.
- Create a `/demo` page with a guided walkthrough of the main application features.
- Create a `/dashboard` page that displays saved records from Supabase.
- Respect guest-session data access and avoid exposing other users' records.
- Update the `/docs` section with the original development prompts, build logs, and technical decisions.
- Include an Agent Map explaining how the application's components interact.
- Add an Impact & Viability analysis covering user benefits, technical feasibility, limitations, costs, and safety.
- Include a Version 2 Roadmap with realistic future improvements.
- Maintain the existing purple-and-white design and responsive layout.
- Preserve the rule-based Guided Assistant without introducing a live AI model.
- Use existing tools and avoid unnecessary changes to working code.
- Organize development into at least five meaningful GitHub commits.
- Verify at least two successful Vercel deployments.
- Perform three software tests and full-site regression testing.
- Support evaluation with five real external users in total.
- Implement and retest at least one improvement based on actual testing results.
- Save the exact coding prompts and document development decisions and test evidence.

**TECH STACK:**

Next.js, React, TypeScript, Tailwind CSS, Supabase, Git & GitHub, Vercel, and VS Code.

**DATABASE:**

Reuse the existing Supabase integration and guest-session data model. Inspect the current database structure and access policies before implementing the Dashboard.

Do not expose credentials, overwrite existing records, or introduce unnecessary tables.

**ACCEPTANCE CRITERIA:**

The integrated Workout Planner application must load successfully, preserve the functionality of previous modules, provide working Demo and Dashboard pages, and include the required project documentation.

The application must pass the planned software tests and full-site regression checks. External-user feedback and at least one verified post-testing improvement must be documented.

GitHub commits, Vercel deployments, and the original development prompts must provide evidence of the implementation.

**IMPLEMENTATION INSTRUCTION:**

First, inspect the existing repository and compare its current functionality with the Module 6 requirements.

Identify reusable components, missing features, and possible integration risks.

Present a clear implementation plan before modifying any code. Do not claim that a feature, test, commit, or deployment is complete without verifying it.

## Prompt 2 onward

Append the exact text of each subsequent coding instruction before requesting a code change. This section is intentionally empty until a new prompt is actually used.

## Prompt 2 — User's actual development instruction (November 15, 2026)

> okay quiero que trabajemos como le hemos estado haciendo, me mandas el código y hacemos los 5 commit, hay que hacerlo lo mas rápido posible que ya me quiero dormir

This user instruction is quoted exactly from the development conversation. It requested the practical five-commit implementation workflow. The code changes and results will be verifiable through actual Git history after the package is applied.
