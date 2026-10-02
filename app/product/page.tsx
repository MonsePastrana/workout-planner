import Link from "next/link";

const featureRows = [
  {
    feature: "Workout Generator",
    description: "Create workouts based on goal, level, days, and available time.",
    free: true,
    plus: true,
    pro: true,
  },
  {
    feature: "Basic Personalization",
    description: "Adjust workouts using basic user preferences.",
    free: true,
    plus: true,
    pro: true,
  },
  {
    feature: "Saved Workouts",
    description: "Save generated workout plans for future use.",
    free: false,
    plus: true,
    pro: true,
  },
  {
    feature: "Research Insights",
    description: "Access structured fitness research and benchmark information.",
    free: false,
    plus: true,
    pro: true,
  },
  {
    feature: "Advanced Personalization",
    description: "More detailed workout options and planning controls.",
    free: false,
    plus: false,
    pro: true,
  },
  {
    feature: "Progress Tracking",
    description: "Future feature for recording exercises, weight, and repetitions.",
    free: false,
    plus: false,
    pro: true,
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    subtitle: "Simple workout planning",
    features: [
      "Workout Generator",
      "Basic Personalization",
      "Basic workout access",
    ],
  },
  {
    name: "Plus",
    price: "$4.99",
    subtitle: "More control and saved planning",
    features: [
      "Everything in Free",
      "Saved Workouts",
      "Research Insights",
      "More planning options",
    ],
    featured: true,
  },
  {
    name: "Pro",
    price: "$8.99",
    subtitle: "Advanced personalized experience",
    features: [
      "Everything in Plus",
      "Advanced Personalization",
      "Progress Tracking",
      "Future advanced analytics",
    ],
  },
];

const segments = [
  {
    name: "Students & Young Adults",
    description:
      "Users who need simple, affordable workouts that fit limited time and changing schedules.",
    needs: [
      "Low price",
      "Quick workout planning",
      "Flexible schedules",
      "Simple interface",
    ],
  },
  {
    name: "Busy Professionals",
    description:
      "Users who value convenience, personalization, and structured workout planning.",
    needs: [
      "Time efficiency",
      "Personalized routines",
      "Saved plans",
      "Progress visibility",
    ],
  },
];

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-purple-700"
          >
            🏋️ Workout Planner
          </Link>

          <nav className="flex gap-5 text-sm font-medium">
            <Link href="/" className="hover:text-purple-700">
              Home
            </Link>

            <Link href="/research" className="hover:text-purple-700">
              Research
            </Link>

            <Link href="/product" className="text-purple-700">
              Product
            </Link>

            <Link href="/pricing" className="hover:text-purple-700">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-4xl">
          <p className="mb-3 font-semibold text-purple-700">
            Week 3 — Product Architecture
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Product Architecture
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
            Explore how Workout Planner can be organized into product features,
            pricing tiers, and customer segments.
          </p>

          <Link
            href="/pricing"
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-500 px-6 py-3 font-bold text-white transition hover:opacity-90"
          >
            Open Pricing Simulator
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <p className="font-semibold text-purple-700">
            1. Product Feature Map
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Features across product tiers
          </h2>

          <p className="mt-2 text-zinc-600">
            This feature map shows how Workout Planner could organize its
            capabilities across Free, Plus, and Pro plans.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-zinc-50 text-left">
              <tr>
                <th className="px-6 py-4 text-sm font-bold">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-bold">
                  Free
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold">
                  Plus
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold">
                  Pro
                </th>
              </tr>
            </thead>

            <tbody>
              {featureRows.map((row) => (
                <tr key={row.feature} className="border-t border-zinc-200">
                  <td className="px-6 py-5">
                    <p className="font-bold">{row.feature}</p>
                    <p className="mt-1 max-w-xl text-sm text-zinc-500">
                      {row.description}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-center text-xl">
                    {row.free ? "✓" : "—"}
                  </td>

                  <td className="px-6 py-5 text-center text-xl">
                    {row.plus ? "✓" : "—"}
                  </td>

                  <td className="px-6 py-5 text-center text-xl">
                    {row.pro ? "✓" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="font-semibold text-purple-700">2. Pricing Tiers</p>

            <h2 className="mt-2 text-3xl font-bold">
              Three product options
            </h2>

            <p className="mt-2 text-zinc-600">
              Example baseline pricing for the Week 3 simulator.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl border p-7 shadow-sm ${
                  tier.featured
                    ? "border-purple-400 bg-purple-50"
                    : "border-zinc-200 bg-white"
                }`}
              >
                {tier.featured && (
                  <span className="mb-5 inline-block rounded-full bg-purple-700 px-3 py-1 text-xs font-bold text-white">
                    Suggested
                  </span>
                )}

                <h3 className="text-2xl font-black">{tier.name}</h3>

                <p className="mt-2 text-zinc-500">
                  {tier.subtitle}
                </p>

                <p className="mt-6 text-4xl font-black text-purple-700">
                  {tier.price}
                  <span className="text-base font-medium text-zinc-500">
                    /month
                  </span>
                </p>

                <ul className="mt-7 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="font-bold text-purple-700">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="font-semibold text-purple-700">
            3. Customer Segments
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Two primary customer groups
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {segments.map((segment) => (
            <article
              key={segment.name}
              className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                👤
              </div>

              <h3 className="text-2xl font-black">{segment.name}</h3>

              <p className="mt-3 leading-7 text-zinc-600">
                {segment.description}
              </p>

              <div className="mt-6">
                <p className="font-bold">Main Needs</p>

                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {segment.needs.map((need) => (
                    <li
                      key={need}
                      className="rounded-xl bg-zinc-50 px-4 py-3 text-sm"
                    >
                      {need}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-purple-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 md:flex-row md:items-center">
          <div>
            <p className="font-semibold text-purple-300">
              Week 3 Pricing Simulator
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Test different revenue scenarios.
            </h2>
          </div>

          <Link
            href="/pricing"
            className="rounded-xl bg-white px-6 py-3 font-bold text-purple-800"
          >
            Go to Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}