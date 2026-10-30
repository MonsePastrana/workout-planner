import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Core", href: "/core" },
  { label: "Research", href: "/research" },
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Marketing", href: "/marketing" },
  { label: "Docs", href: "/docs" },
];

const steps = [
  {
    title: "Choose your goal",
    description:
      "Select strength, muscle gain, general fitness, or weight loss as your planning goal.",
  },
  {
    title: "Set your availability",
    description:
      "Choose your experience level, training days, and preferred workout duration.",
  },
  {
    title: "Review your routine",
    description:
      "Explore the workout proposal and decide how it fits your schedule and needs.",
  },
];

const audiences = [
  {
    title: "Students & Young Adults",
    description:
      "Make room for training between classes, work, and other commitments.",
    benefit: "A simple starting point, with a schedule you choose.",
  },
  {
    title: "Busy Professionals",
    description:
      "Organize workout time around a busy week instead of starting from scratch.",
    benefit: "Clear planning based on your goals and available time.",
  },
];

const modules = [
  {
    title: "Workout Generator",
    href: "/core",
    description: "Create a workout proposal from your preferences.",
  },
  {
    title: "Research & Benchmarking",
    href: "/research",
    description: "Explore competitors, market insights, and product risks.",
  },
  {
    title: "Product Architecture",
    href: "/product",
    description: "Review the feature map, proposed plans, and audiences.",
  },
  {
    title: "Pricing Simulator",
    href: "/pricing",
    description: "Explore hypothetical user and revenue scenarios.",
  },
  {
    title: "Marketing Studio",
    href: "/marketing",
    description:
      "Explore the marketing dashboard prototype. Tools are in development.",
  },
  {
    title: "Project Documentation",
    href: "/docs",
    description: "Read about the project and its development process.",
  },
];

const roadmap = [
  "Infrastructure",
  "Workout Input Form",
  "Routine Generator",
  "Saved Workouts",
  "Research & Benchmarking",
  "Product Architecture & Pricing",
  "Marketing & Content - in development",
];

const questions = [
  {
    question: "What information do I need to get started?",
    answer:
      "Choose a fitness goal, your experience level, training days per week, and a preferred workout duration.",
  },
  {
    question: "Does Workout Planner replace a personal trainer?",
    answer:
      "No. It supports workout organization. It does not provide individual coaching, technique assessment, or medical advice.",
  },
  {
    question: "Is progress tracking available?",
    answer:
      "Not yet. Progress Tracking is part of the proposed product architecture, not a completed tracking feature.",
  },
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-4 focus:text-purple-800"
      >
        Skip to main content
      </a>

      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/"
            className={`text-xl font-black text-purple-800 ${focus}`}
          >
            Workout Planner
          </Link>

          <Link
            href="/core"
            className={`rounded-xl bg-purple-700 px-5 py-3 text-sm font-bold text-white hover:bg-purple-800 ${focus}`}
          >
            Build My Workout
          </Link>
        </div>

        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3 px-6 pb-5 text-sm font-semibold"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === "/" ? "page" : undefined}
              className={`rounded text-zinc-600 hover:text-purple-800 ${focus}`}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="#roadmap"
            className={`rounded text-zinc-600 hover:text-purple-800 ${focus}`}
          >
            Roadmap
          </a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        {/* HERO */}
        <section className="border-b border-purple-100 bg-purple-50">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-purple-800">
                Simple planning. Your schedule.
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Build a workout that{" "}
                <span className="text-purple-700">fits your life.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
                Turn your goals, experience, and available time into a structured
                workout proposal. Spend less time figuring out where to start.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/core"
                  className={`rounded-xl bg-purple-700 px-6 py-4 font-bold text-white hover:bg-purple-800 ${focus}`}
                >
                  Build My Workout
                </Link>

                <a
                  href="#how-it-works"
                  className={`rounded-xl border border-purple-200 bg-white px-6 py-4 font-bold text-purple-800 hover:bg-purple-100 ${focus}`}
                >
                  See How It Works
                </a>
              </div>

              <p className="mt-5 text-sm text-zinc-600">
                Planning support, not a substitute for professional guidance.
              </p>
            </div>

            <aside
              aria-label="Illustrative workout settings"
              className="rounded-3xl border border-purple-200 bg-white p-6 shadow-lg sm:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-purple-700">
                Example setup
              </p>

              <h2 className="mt-3 text-2xl font-black">
                A plan starts with your preferences.
              </h2>

              <dl className="mt-7 grid grid-cols-2 gap-4">
                {[
                  ["Goal", "General Fitness"],
                  ["Level", "Beginner"],
                  ["Days per week", "3 days"],
                  ["Workout duration", "30 minutes"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-zinc-50 p-4">
                    <dt className="text-xs font-semibold uppercase text-zinc-500">
                      {label}
                    </dt>
                    <dd className="mt-2 font-bold text-purple-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 rounded-xl bg-purple-50 p-4 text-sm leading-6 text-purple-900">
                Illustrative example only. Open the generator to choose your own
                settings; these values are not a saved workout.
              </p>
            </aside>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl scroll-mt-6 px-6 py-16"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-purple-700">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Less guesswork. A clearer starting point.
          </h2>

          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-zinc-200 p-6"
              >
                <p className="text-sm font-bold text-purple-700">
                  STEP {index + 1}
                </p>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* TARGET AUDIENCES */}
        <section className="bg-zinc-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-700">
              Made for real schedules
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Your week is busy. Planning can be simpler.
            </h2>

            <div className="mt-9 grid gap-6 md:grid-cols-2">
              {audiences.map((audience) => (
                <article
                  key={audience.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-7"
                >
                  <h3 className="text-2xl font-bold">{audience.title}</h3>
                  <p className="mt-4 leading-7 text-zinc-600">
                    {audience.description}
                  </p>
                  <p className="mt-5 font-semibold text-purple-800">
                    {audience.benefit}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT MODULES */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-700">
            Explore the project
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Workout planning and the product behind it.
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
            Start with the generator, or explore the research and business tools
            developed for this student project. Pricing scenarios are
            simulations, not subscription checkout pages.
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className={`group rounded-2xl border border-zinc-200 p-6 hover:border-purple-400 hover:bg-purple-50 ${focus}`}
              >
                <h3 className="text-xl font-bold group-hover:text-purple-800">
                  {module.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-600">
                  {module.description}
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-purple-700">
                  Open module &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section
          id="roadmap"
          className="scroll-mt-6 bg-purple-950 px-6 py-16 text-white"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-widest text-purple-200">
              Project roadmap
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Building Workout Planner step by step.
            </h2>

            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roadmap.map((item, index) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/20 p-5"
                >
                  <p className="text-xs font-bold text-purple-200">
                    PHASE {index + 1}
                  </p>
                  <p className="mt-2 font-semibold">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-black">Before you get started</h2>

          <div className="mt-8 space-y-4">
            {questions.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-zinc-200 p-5"
              >
                <summary
                  className={`cursor-pointer rounded font-bold ${focus}`}
                >
                  {item.question}
                </summary>
                <p className="mt-4 leading-7 text-zinc-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl rounded-3xl bg-purple-100 px-6 py-12 text-center">
            <h2 className="text-3xl font-black text-purple-950">
              Start with a plan that fits your week.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-zinc-700">
              Choose your goal, set your availability, and explore your workout
              proposal.
            </p>

            <Link
              href="/core"
              className={`mt-7 inline-block rounded-xl bg-purple-700 px-7 py-4 font-bold text-white hover:bg-purple-800 ${focus}`}
            >
              Build My Workout
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-black text-purple-800">Workout Planner</p>

          <p className="mt-2 text-sm text-zinc-600">
            Simple. Flexible. Personalized planning.
          </p>

          <nav
            aria-label="Footer navigation"
            className="mt-6 flex flex-wrap gap-5 text-sm"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded text-zinc-600 hover:text-purple-800 ${focus}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="mt-6 text-xs text-zinc-500">
            Workout Planner - Student project.
          </p>
        </div>
      </footer>
    </div>
  );
}