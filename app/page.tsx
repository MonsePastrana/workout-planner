import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/workout-planner-logo.png"
              alt="Workout Planner"
              width={190}
              height={70}
              priority
              className="h-auto w-40 md:w-48"
            />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 lg:flex">
            <a href="#home" className="transition hover:text-purple-600">
              Home
            </a>

            <a href="#core" className="transition hover:text-purple-600">
              Core
            </a>

            <a href="#product" className="transition hover:text-purple-600">
              Product
            </a>

            <a href="#pricing" className="transition hover:text-purple-600">
              Pricing
            </a>

            <a href="#marketing" className="transition hover:text-purple-600">
              Marketing
            </a>

            <a href="#chat" className="transition hover:text-purple-600">
              Chat
            </a>

            <Link href="/docs" className="transition hover:text-purple-600">
              Docs
            </Link>

            <a href="#demo" className="transition hover:text-purple-600">
              Demo
            </a>

            <a
              href="#dashboard"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-white transition hover:bg-purple-600"
            >
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-5 font-bold uppercase tracking-[0.25em] text-purple-600">
              Workout Planner
            </p>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Build a workout that fits your life.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
              Create and organize workout routines based on your goals,
              experience level, available time, and weekly schedule.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#product"
                className="rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Explore the Product
              </a>

              <Link
                href="/docs"
                className="rounded-xl border border-zinc-300 px-7 py-3 font-semibold transition hover:border-purple-600 hover:text-purple-600"
              >
                Documentation
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-lg">
            <Image
              src="/gym-hero.jpg"
              alt="People training in a gym"
              width={900}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUICK VALUE CARDS */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
            <div className="mb-4 text-3xl">🎯</div>

            <h3 className="text-xl font-bold">Goal Based</h3>

            <p className="mt-3 leading-7 text-zinc-600">
              Organize your workout plan around goals such as strength,
              muscle gain, general fitness, or weight management.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
            <div className="mb-4 text-3xl">📅</div>

            <h3 className="text-xl font-bold">Built Around Your Time</h3>

            <p className="mt-3 leading-7 text-zinc-600">
              Workout Planner is designed for students and busy people who
              need routines that fit their available days and schedule.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
            <div className="mb-4 text-3xl">🏋️</div>

            <h3 className="text-xl font-bold">Simple and Practical</h3>

            <p className="mt-3 leading-7 text-zinc-600">
              The goal is to make workout organization simple without
              overwhelming users with unnecessary complexity.
            </p>
          </div>
        </div>
      </section>

      {/* CORE */}
      <section id="core" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-purple-600">
              Core
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Workout planning made easier.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Many people want to exercise consistently but struggle to know
              what exercises to perform, how often to train, and how to
              organize workouts throughout the week.
            </p>

            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Workout Planner is being designed to solve that problem with a
              simple and organized workout planning experience.
            </p>
          </div>

          <div className="rounded-3xl bg-zinc-950 p-10 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
              Core Value
            </p>

            <h3 className="mt-4 text-3xl font-black">
              Your goals. Your time. Your workout.
            </h3>

            <p className="mt-5 leading-7 text-zinc-300">
              A flexible workout planning platform focused on making exercise
              organization easier for students, young adults, and people with
              limited time.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product" className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-purple-600">
              Product
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              How Workout Planner will work
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              The first product experience focuses on three simple steps.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <span className="text-sm font-black text-purple-600">01</span>

              <div className="mt-5 text-4xl">🎯</div>

              <h3 className="mt-5 text-2xl font-bold">Choose Your Goal</h3>

              <p className="mt-4 leading-7 text-zinc-600">
                Select the main goal that will guide your future workout
                routine.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <span className="text-sm font-black text-purple-600">02</span>

              <div className="mt-5 text-4xl">📆</div>

              <h3 className="mt-5 text-2xl font-bold">Set Your Schedule</h3>

              <p className="mt-4 leading-7 text-zinc-600">
                Choose how many days per week you can train and how much time
                you have available.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <span className="text-sm font-black text-purple-600">03</span>

              <div className="mt-5 text-4xl">💪</div>

              <h3 className="mt-5 text-2xl font-bold">Build Your Workout</h3>

              <p className="mt-4 leading-7 text-zinc-600">
                Future versions will use the information provided by the user
                to help organize a personalized workout routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-purple-600">
            Pricing
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Early development preview
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-600">
            Workout Planner is currently under development. Final pricing has
            not been defined.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-3xl border-2 border-purple-600 p-9 shadow-sm">
          <p className="font-bold text-purple-600">Development Preview</p>

          <h3 className="mt-4 text-4xl font-black">Free</h3>

          <p className="mt-4 text-zinc-600">
            Access to the current public project preview.
          </p>

          <div className="mt-7 space-y-3 text-zinc-700">
            <p>✓ Public homepage</p>
            <p>✓ Product concept</p>
            <p>✓ Project roadmap</p>
            <p>✓ Documentation preview</p>
          </div>
        </div>
      </section>

      {/* MARKETING */}
      <section id="marketing" className="bg-zinc-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-bold uppercase tracking-[0.2em] text-purple-400">
            Marketing
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-5xl">
            Designed for people who want to exercise but need more structure.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <h3 className="text-xl font-bold">Students</h3>
              <p className="mt-3 text-zinc-400">
                Workout planning that can fit around classes and study time.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <h3 className="text-xl font-bold">Young Adults</h3>
              <p className="mt-3 text-zinc-400">
                A simple way to organize training without needing complicated
                planning tools.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <h3 className="text-xl font-bold">Busy People</h3>
              <p className="mt-3 text-zinc-400">
                Build exercise into a limited weekly schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAT */}
      <section id="chat" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-purple-50 p-10 text-center md:p-16">
          <p className="font-bold uppercase tracking-[0.2em] text-purple-600">
            Chat
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Workout assistance is planned for the future.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            A future version may include interactive assistance for workout
            organization. This feature is not part of the current version.
          </p>

          <span className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-purple-600 shadow-sm">
            Coming Later
          </span>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-purple-600">
            Demo
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Workout Planner Preview
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            This live website is the first public preview of the Workout
            Planner project.
          </p>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
            <Image
              src="/workout-planner-logo.png"
              alt="Workout Planner Logo"
              width={400}
              height={180}
              className="mx-auto h-auto"
            />

            <p className="mt-8 text-xl font-semibold">
              More product functionality will be added in future development
              phases.
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-zinc-200 p-10 text-center md:p-16">
          <p className="font-bold uppercase tracking-[0.2em] text-purple-600">
            Dashboard
          </p>

          <h2 className="mt-4 text-4xl font-black">Dashboard Coming Soon</h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            User accounts, saved workouts, workout preferences, and progress
            tracking are planned for future versions of Workout Planner.
          </p>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="bg-zinc-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-purple-400">
              Roadmap
            </p>

            <h2 className="mt-4 text-4xl font-black">Project Roadmap</h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:grid-cols-6">
            {[
              ["01", "Infrastructure"],
              ["02", "Workout Input"],
              ["03", "Routine Generator"],
              ["04", "Saved Workouts"],
              ["05", "Progress Tracking"],
              ["06", "Final Product"],
            ].map(([number, title]) => (
              <div
                key={number}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 font-black">
                  {number}
                </div>

                <p className="mt-5 font-bold">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black px-6 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <Image
              src="/workout-planner-logo.png"
              alt="Workout Planner"
              width={190}
              height={70}
              className="h-auto w-40 brightness-0 invert"
            />

            <p className="mt-4 text-sm text-zinc-500">
              Build a workout that fits your life.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <a href="#home" className="hover:text-white">
              Home
            </a>
            <a href="#core" className="hover:text-white">
              Core
            </a>
            <a href="#product" className="hover:text-white">
              Product
            </a>
            <Link href="/docs" className="hover:text-white">
              Docs
            </Link>
          </div>

          <p className="text-sm text-zinc-500">
            ©️ 2026 Workout Planner.
          </p>
        </div>
      </footer>
    </main>
  );
}