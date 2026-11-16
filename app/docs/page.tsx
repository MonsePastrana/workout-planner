import Link from "next/link";

const paths = [
  { name: "Workout Generator", route: "/core", role: "Builds a proposal from user-selected preferences." },
  { name: "Research & Benchmarking", route: "/research", role: "Organizes research examples and saved research outputs." },
  { name: "Product & Pricing", route: "/pricing", role: "Explains product decisions and simulated pricing scenarios." },
  { name: "Marketing Studio", route: "/marketing", role: "Organizes prepared content, manual A/B calculations, and saved marketing assets." },
  { name: "Guided Assistant", route: "/chat", role: "Uses predefined rules, a human confirmation step, and structured feedback." },
  { name: "Guided Demo", route: "/demo", role: "Walks through the existing product features in six steps." },
  { name: "Dashboard", route: "/dashboard", role: "Shows records accessible to current anonymous guest sessions." },
];

const roadmap = [
  { phase: "V2.1", idea: "Consistent navigation and accessibility", validation: "Retest with external users on desktop and mobile." },
  { phase: "V2.2", idea: "Unified, secure guest-session model", validation: "Audit Supabase ownership and row-level security before migrating data." },
  { phase: "V2.3", idea: "Progress tracking for saved workouts", validation: "Add explicit consent, privacy controls, and usability tests." },
];

const prompt = `ROLE:
You are my disciplined AI-native product architect and coding partner.

COURSE RULE:
Do not let me code before the plan is clear.

TASK:
Develop Module 6: Integrated Agentic Venture + Impact & Viability for the existing Workout Planner application.

IMPLEMENTATION SUMMARY:
- Review the existing project structure and reuse previously implemented modules.
- Integrate the existing pages through consistent navigation.
- Build a guided /demo walkthrough and a /dashboard for session-scoped records.
- Expand /docs with the Agent Map, impact and viability assessment, Version 2 roadmap, and build records.
- Preserve the existing purple-and-white design and rule-based Guided Assistant.
- Protect guest-session data and verify the application through testing and real user feedback.
- Document at least five commits, two deployments, and an improvement after testing.`;

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className={`text-xl font-black text-purple-800 ${focus}`}>Workout Planner</Link>
          <Link href="/demo" className={`rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white ${focus}`}>Explore Demo</Link>
        </div>
        <nav aria-label="Documentation navigation" className="mx-auto flex max-w-6xl flex-wrap gap-5 px-6 pb-5 text-sm font-semibold">
          <Link href="/" className={focus}>Home</Link>
          <Link href="/dashboard" className={focus}>Dashboard</Link>
          <Link href="/chat" className={focus}>Assistant</Link>
          <Link href="/marketing" className={focus}>Marketing</Link>
        </nav>
      </header>
      <section className="border-b border-purple-100 bg-purple-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-800">Module 6 / Project Documentation</p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">How Workout Planner works</h1>
          <p className="mt-5 max-w-3xl leading-8 text-zinc-700">
            A practical map of the implemented modules, human decisions, testing boundaries,
            and planned improvements. This student project uses rule-based features, not an autonomous AI agent.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-12">
        <section aria-labelledby="agent-map">
          <h2 id="agent-map" className="text-2xl font-black">Agent Map &amp; Human Checkpoint</h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-700">
            User selection → Workout Generator or Guided Assistant → rule-based output → user review
            and confirmation → optional saving of structured results. A human chooses and confirms
            preferences; software does not independently prescribe medical treatment.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {paths.map((item) => (
              <article key={item.route} className="rounded-2xl border border-zinc-200 p-5">
                <h3 className="text-lg font-bold text-purple-900">{item.name}</h3>
                <p className="mt-2 leading-7 text-zinc-600">{item.role}</p>
                <Link href={item.route} className={`mt-3 inline-block font-semibold text-purple-800 underline ${focus}`}>Open {item.route}</Link>
              </article>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-purple-50 p-5 text-sm leading-7 text-zinc-700">
            Supabase stores structured data. Marketing and Assistant currently use distinct anonymous
            guest sessions with separate client storage keys. The Dashboard reads only through their
            existing session-scoped loaders. Workout and research database ownership needs a separate audit.
          </p>
        </section>
        <section aria-labelledby="viability">
          <h2 id="viability" className="text-2xl font-black">Impact &amp; Viability</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-purple-200 p-6">
              <h3 className="font-bold text-purple-900">Potential impact</h3>
              <p className="mt-3 leading-7 text-zinc-700">Workout Planner can help students and busy adults select a starting routine based on time and goals. It offers clear next steps, not proof of health outcomes.</p>
            </article>
            <article className="rounded-2xl border border-purple-200 p-6">
              <h3 className="font-bold text-purple-900">Technical feasibility</h3>
              <p className="mt-3 leading-7 text-zinc-700">Existing Next.js routes, predefined logic, GitHub, Vercel, and Supabase reduce implementation complexity. Authentication and data ownership still require care.</p>
            </article>
            <article className="rounded-2xl border border-purple-200 p-6">
              <h3 className="font-bold text-purple-900">Costs and limitations</h3>
              <p className="mt-3 leading-7 text-zinc-700">The prototype uses an existing hosting and database setup. Production costs would depend on actual traffic and provider pricing; no revenue or cost figures are claimed here.</p>
            </article>
            <article className="rounded-2xl border border-purple-200 p-6">
              <h3 className="font-bold text-purple-900">Safety and privacy</h3>
              <p className="mt-3 leading-7 text-zinc-700">Guidance is not medical advice. Sensitive medical details are not requested. Guest-session access and database policies need verification before expanding the Dashboard.</p>
            </article>
          </div>
        </section>
        <section aria-labelledby="roadmap-v2">
          <h2 id="roadmap-v2" className="text-2xl font-black">Version 2 Roadmap</h2>
          <div className="mt-6 space-y-4">
            {roadmap.map((item) => (
              <article key={item.phase} className="rounded-2xl border border-zinc-200 p-5">
                <h3 className="font-bold text-purple-900">{item.phase} — {item.idea}</h3>
                <p className="mt-2 leading-7 text-zinc-700">Validation: {item.validation}</p>
              </article>
            ))}
          </div>
        </section>
        <section aria-labelledby="prompt-records">
          <h2 id="prompt-records" className="text-2xl font-black">Original Prompt &amp; Build Log</h2>
          <p className="mt-3 leading-7 text-zinc-700">
            The initial implementation brief was prepared before coding. This concise,
            professionally edited summary describes the planned scope and technical requirements.
            The full original planning prompt is preserved in the linked repository log:
          </p>
          <blockquote className="mt-5 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-purple-200 bg-purple-50 p-5 font-mono text-sm leading-7 text-zinc-800">
            {prompt}
          </blockquote>
          <a href="https://github.com/MonsePastrana/workout-planner/blob/main/docs/module6/prompt-log.md" target="_blank" rel="noopener noreferrer" className={`mt-5 inline-block font-bold text-purple-800 underline ${focus}`}>
            Read the original Module 6 planning prompt on GitHub
          </a>
          <p className="mt-4 text-sm text-zinc-600">
            The build plan and risk notes are in docs/module6/build-plan.md. Test results,
            actual external-user feedback, and commit identifiers must be recorded when verified,
            not invented before testing.
          </p>
        </section>
      </div>
    </main>
  );
}
