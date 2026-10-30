import Link from "next/link";

const audiences = [
  {
    title: "Students & Young Adults",
    description:
      "Affordable, flexible workout planning for students and young adults.",
    icon: "🎓",
  },
  {
    title: "Busy Professionals",
    description:
      "Simple workout organization for people with limited free time.",
    icon: "💼",
  },
];

const sections = [
  {
    title: "Brand System",
    description: "Define brand identity, tone, and key messages.",
    icon: "🎨",
  },
  {
    title: "Landing Page Copy",
    description: "Create clear headlines and marketing messages.",
    icon: "✍️",
  },
  {
    title: "Social Media Content",
    description: "Organize 10 promotional social media posts.",
    icon: "📱",
  },
  {
    title: "Video Scripts",
    description: "Prepare 3 short promotional video scripts.",
    icon: "🎬",
  },
  {
    title: "Campaign Calendar",
    description: "Plan a 14-day marketing campaign.",
    icon: "📅",
  },
  {
    title: "A/B Testing",
    description: "Compare marketing headlines and messages.",
    icon: "📊",
  },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-black text-purple-700">
            Workout Planner
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-600 hover:text-purple-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-purple-950 via-purple-800 to-fuchsia-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-purple-200">
            Week 4 — Marketing Engine
          </p>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Workout Planner Marketing Studio
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100">
            Build marketing content, organize campaigns, and
            communicate the value of Workout Planner.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#marketing-tools"
              className="rounded-xl bg-white px-6 py-3 font-bold text-purple-800 transition hover:bg-purple-100"
            >
              Explore Marketing Tools
            </a>

            <Link
              href="/core"
              className="rounded-xl border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Try Workout Generator
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-bold uppercase tracking-wider text-purple-700">
          Brand Identity
        </p>

        <h2 className="mt-3 text-3xl font-black">
          Train smarter. Plan better.
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
          Workout Planner makes workout organization simple,
          accessible, and flexible. Our mission is to help
          people build training routines that fit their goals,
          schedules, and experience levels.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Mission", "Make workout planning simple and accessible."],
            ["Voice", "Motivating, friendly, clear, and supportive."],
            ["Value", "Personalized planning that fits real schedules."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-black text-purple-700">
                {title}
              </h3>
              <p className="mt-3 text-zinc-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase text-purple-700">
            Target Audience
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Who are we helping?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {audiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8"
              >
                <div className="text-4xl">{audience.icon}</div>
                <h3 className="mt-5 text-2xl font-black">
                  {audience.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-600">
                  {audience.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="marketing-tools"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <p className="font-bold uppercase text-purple-700">
          Marketing Dashboard
        </p>

        <h2 className="mt-3 text-4xl font-black">
          Content & Campaign Tools
        </h2>

        <p className="mt-4 text-zinc-600">
          Explore the marketing components of Workout Planner.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
            >
              <div className="text-4xl">{section.icon}</div>

              <h3 className="mt-5 text-xl font-black">
                {section.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-600">
                {section.description}
              </p>

              <p className="mt-6 text-sm font-semibold text-purple-700">
                Content section
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-purple-950 px-6 py-8 text-center text-sm text-purple-200">
        Workout Planner — Marketing Engine · Week 4
      </footer>
    </main>
  );
}