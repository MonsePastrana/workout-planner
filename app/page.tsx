import Link from "next/link";

const features = [
  {
    title: "Choose Your Goal",
    description:
      "Select your fitness goal, such as strength, muscle gain, weight loss, or general fitness.",
    icon: "🎯",
  },
  {
    title: "Set Your Schedule",
    description:
      "Choose how many days per week you can train and how much time you have available.",
    icon: "📅",
  },
  {
    title: "Build Your Workout",
    description:
      "Create a workout routine based on your goals, schedule, and experience level.",
    icon: "🏋️",
  },
];

const roadmap = [
  "Infrastructure",
  "Workout Input Form",
  "Routine Generator",
  "Saved Workouts",
  "Research & Benchmarking",
  "Product Architecture & Pricing",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-500 text-xl text-white">
              🏋️
            </div>

            <div className="leading-tight">
              <p className="font-black text-zinc-900">Workout</p>
              <p className="font-black text-purple-700">Planner</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-purple-700">
              Home
            </Link>

            <Link href="/core" className="hover:text-purple-700">
              Core
            </Link>

            <Link href="/research" className="hover:text-purple-700">
              Research
            </Link>

            <Link href="/product" className="hover:text-purple-700">
              Product
            </Link>

            <Link href="/pricing" className="hover:text-purple-700">
              Pricing
            </Link>

            <a href="#roadmap" className="hover:text-purple-700">
              Roadmap
            </a>

            <Link href="/docs" className="hover:text-purple-700">
              Docs
            </Link>
          </nav>

          <Link
            href="/core"
            className="rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-100/60 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <p className="mb-4 font-bold uppercase tracking-[0.2em] text-purple-700">
              Workout Planner
            </p>

            <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Build a workout that{" "}
              <span className="text-purple-700">fits your life.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Workout Planner helps students and people with limited time
              create and organize workout routines based on their goals,
              available time, and experience level.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/core"
                className="rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-500 px-6 py-3.5 font-bold text-white transition hover:opacity-90"
              >
                Build My Workout
              </Link>

              <Link
                href="/research"
                className="rounded-xl border border-zinc-300 bg-white px-6 py-3.5 font-bold transition hover:border-purple-400 hover:text-purple-700"
              >
                Explore Research
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-8 shadow-xl shadow-purple-100">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-purple-700">
                YOUR WORKOUT
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Personalized planning
              </h2>

              <div className="mt-7 space-y-4">
                <div className="rounded-2xl bg-zinc-50 p-5">
                  <p className="text-xs font-semibold uppercase text-zinc-500">
                    Goal
                  </p>
                  <p className="mt-1 font-bold">Strength Training</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-zinc-50 p-5">
                    <p className="text-xs font-semibold uppercase text-zinc-500">
                      Days
                    </p>
                    <p className="mt-1 text-2xl font-black text-purple-700">
                      4
                    </p>
                  </div>

                  <div className="rounded-2xl bg-zinc-50 p-5">
                    <p className="text-xs font-semibold uppercase text-zinc-500">
                      Duration
                    </p>
                    <p className="mt-1 text-2xl font-black text-purple-700">
                      45 min
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-purple-700 p-5 text-white">
                  <p className="text-sm text-purple-100">
                    Simple. Flexible. Personalized.
                  </p>
                  <p className="mt-1 font-bold">
                    Plan workouts around your schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold text-purple-700">HOW IT WORKS</p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              A simple way to organize your workouts.
            </h2>

            <p className="mt-4 text-zinc-600">
              Workout Planner focuses on the information that matters most when
              creating a routine.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                  {feature.icon}
                </div>

                <p className="mt-6 text-sm font-bold text-purple-700">
                  STEP {index + 1}
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="font-bold text-purple-700">
              WORKOUT PLANNER MODULES
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Explore the project.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/core"
              className="group rounded-3xl border border-zinc-200 p-7 transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
            >
              <div className="text-3xl">🏋️</div>
              <h3 className="mt-5 text-xl font-black group-hover:text-purple-700">
                Workout Core
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Generate workouts based on goal, level, days, and duration.
              </p>
            </Link>

            <Link
              href="/research"
              className="group rounded-3xl border border-zinc-200 p-7 transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
            >
              <div className="text-3xl">🔎</div>
              <h3 className="mt-5 text-xl font-black group-hover:text-purple-700">
                Research
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Explore competitors, benchmarks, risks, and market
                opportunities.
              </p>
            </Link>

            <Link
              href="/product"
              className="group rounded-3xl border border-purple-200 bg-purple-50 p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">📦</div>
              <h3 className="mt-5 text-xl font-black text-purple-800">
                Product
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Review the product feature map, pricing tiers, and customer
                segments.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="group rounded-3xl border border-purple-200 bg-purple-50 p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">💰</div>
              <h3 className="mt-5 text-xl font-black text-purple-800">
                Pricing
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Test customer assumptions and simulate monthly and annual
                revenue.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="bg-purple-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-bold text-purple-300">PROJECT ROADMAP</p>

          <h2 className="mt-3 text-4xl font-black">
            Building Workout Planner step by step.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-bold text-purple-300">
                  PHASE {index + 1}
                </p>

                <p className="mt-2 text-lg font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2rem] bg-gradient-to-r from-purple-700 to-fuchsia-500 p-10 text-center text-white sm:p-14">
            <p className="font-semibold text-purple-100">
              WEEK 3 — PRODUCT ARCHITECTURE + PRICING
            </p>

            <h2 className="mt-3 text-4xl font-black">
              Explore the new pricing simulator.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-purple-100">
              Compare product tiers, customer segments, and different revenue
              scenarios for Workout Planner.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/product"
                className="rounded-xl bg-white px-6 py-3 font-bold text-purple-800"
              >
                View Product
              </Link>

              <Link
                href="/pricing"
                className="rounded-xl border border-white/40 px-6 py-3 font-bold text-white"
              >
                Open Pricing Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="font-black text-purple-700">🏋️ Workout Planner</p>
            <p className="mt-1 text-sm text-zinc-500">
              Build a workout that fits your life.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm font-medium text-zinc-600">
            <Link href="/">Home</Link>
            <Link href="/core">Core</Link>
            <Link href="/research">Research</Link>
            <Link href="/product">Product</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">Docs</Link>
          </div>

          <p className="text-sm text-zinc-400">
            © 2026 Workout Planner
          </p>
        </div>
      </footer>
    </main>
  );
}