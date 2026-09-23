"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

const competitors = [
  {
    id: 1,
    name: "Nike Training Club",
    type: "Fitness App",
    market: "Global",
    strength: "Large workout library",
    weakness: "Limited custom planning",
    notes: "Free workouts from a recognized fitness brand.",
  },
  {
    id: 2,
    name: "Fitbod",
    type: "Fitness App",
    market: "Global",
    strength: "Personalized workout planning",
    weakness: "Paid subscription",
    notes: "Strong option for gym and strength-focused users.",
  },
  {
    id: 3,
    name: "Freeletics",
    type: "Fitness App",
    market: "Global",
    strength: "Structured training programs",
    weakness: "Premium features require payment",
    notes: "Popular for guided bodyweight and fitness training.",
  },
  {
    id: 4,
    name: "Calisteniapp",
    type: "Fitness App",
    market: "Mexico / LATAM",
    strength: "Bodyweight workout focus",
    weakness: "More specialized audience",
    notes: "Useful example for Spanish-speaking fitness users.",
  },
  {
    id: 5,
    name: "Smart Fit",
    type: "Gym Chain",
    market: "Mexico",
    strength: "Large physical presence",
    weakness: "Requires gym access or membership",
    notes: "Important substitute for users who prefer in-person training.",
  },
  {
    id: 6,
    name: "YouTube Fitness",
    type: "Content Platform",
    market: "Global",
    strength: "Large amount of free content",
    weakness: "No consistent personalization",
    notes: "A common free alternative to dedicated workout apps.",
  },
  {
    id: 7,
    name: "Personal Trainer",
    type: "Service Substitute",
    market: "Mexico / Global",
    strength: "Highly personalized guidance",
    weakness: "Can be expensive",
    notes: "Human coaching is a direct substitute for workout planning apps.",
  },
  {
    id: 8,
    name: "Spreadsheet / Notes",
    type: "Manual Substitute",
    market: "Global",
    strength: "Free and flexible",
    weakness: "Manual and time-consuming",
    notes: "Users can create routines manually without a dedicated fitness app.",
  },
];

const benchmarkCards = [
  {
    name: "Nike Training Club",
    type: "Fitness App",
    market: "Global",
    price: "Free",
    personalization: "Medium",
    contentQuality: "High",
    overall: "4.5 / 5",
  },
  {
    name: "Fitbod",
    type: "Fitness App",
    market: "Global",
    price: "Subscription",
    personalization: "High",
    contentQuality: "High",
    overall: "4.5 / 5",
  },
  {
    name: "Smart Fit",
    type: "Gym Chain",
    market: "Mexico",
    price: "Membership",
    personalization: "Low",
    contentQuality: "High",
    overall: "4.0 / 5",
  },
];

type SavedResearch = {
  id: string;
  problem_area: string;
  target_user: string;
  country: string;
  keywords: string | null;
  global_examples_count: number;
  competitor_count: number;
  created_at: string;
};

export default function ResearchPage() {
  const [problemArea, setProblemArea] = useState("Home Workouts / Fitness");
  const [targetUser, setTargetUser] = useState("Students / Young Adults");
  const [country, setCountry] = useState("Mexico");

  const [keywords, setKeywords] = useState(
    "home workout, fitness app, gym, healthy lifestyle, Mexico"
  );

  const [hasRunResearch, setHasRunResearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const [savedResearch, setSavedResearch] = useState<SavedResearch[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadSavedResearch();
  }, []);

  function handleResearch() {
    setHasRunResearch(true);
    setSaveMessage("");
  }

  async function loadSavedResearch() {
    const { data, error } = await supabase
      .from("research_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error loading saved research:", error);
      return;
    }

    if (data) {
      setSavedResearch(data as SavedResearch[]);
    }
  }

  async function saveResearch() {
    setIsSaving(true);
    setSaveMessage("");

    const { error } = await supabase.from("research_outputs").insert({
      problem_area: problemArea,
      target_user: targetUser,
      country: country,
      keywords: keywords,
      global_examples_count: 5,
      competitor_count: competitors.length,
    });

    if (error) {
      console.error("Error saving research:", error);
      setSaveMessage("Unable to save research.");
      setIsSaving(false);
      return;
    }

    setSaveMessage("Research saved successfully!");
    setIsSaving(false);

    await loadSavedResearch();
  }

  const types = useMemo(() => {
    return [
      "All Types",
      ...Array.from(new Set(competitors.map((item) => item.type))),
    ];
  }, []);

  const filteredCompetitors = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return competitors.filter((competitor) => {
      const matchesType =
        typeFilter === "All Types" || competitor.type === typeFilter;

      const matchesSearch =
        search === "" ||
        competitor.name.toLowerCase().includes(search) ||
        competitor.type.toLowerCase().includes(search) ||
        competitor.market.toLowerCase().includes(search) ||
        competitor.strength.toLowerCase().includes(search) ||
        competitor.weakness.toLowerCase().includes(search) ||
        competitor.notes.toLowerCase().includes(search);

      return matchesType && matchesSearch;
    });
  }, [searchTerm, typeFilter]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Navigation */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/">
            <Image
              src="/workout-planner-logo.png"
              alt="Workout Planner"
              width={190}
              height={60}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <Link href="/" className="hover:text-purple-600">
              Home
            </Link>

            <Link href="/core" className="hover:text-purple-600">
              Core
            </Link>

            <Link
              href="/research"
              className="border-b-2 border-purple-600 pb-2 font-semibold"
            >
              Research
            </Link>

            <Link href="/product" className="hover:text-purple-600">
              Product
            </Link>

            <Link href="/roadmap" className="hover:text-purple-600">
              Roadmap
            </Link>

            <Link href="/docs" className="hover:text-purple-600">
              Docs
            </Link>
          </nav>

          <Link
            href="/research"
            className="rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 px-6 py-3 font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 font-semibold text-purple-600">/research</p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Research + Benchmarking Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-zinc-500">
            Explore existing solutions, understand the market, and validate
            opportunities for Workout Planner.
          </p>
        </div>

        {/* Intake + Output */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Research Intake */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-purple-600">
              1. Research Intake
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Enter your research focus to review relevant market information.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Problem Area
                </label>

                <select
                  value={problemArea}
                  onChange={(e) => setProblemArea(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
                >
                  <option>Home Workouts / Fitness</option>
                  <option>Workout Planning</option>
                  <option>Gym Training</option>
                  <option>Fitness Apps</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Target User
                </label>

                <select
                  value={targetUser}
                  onChange={(e) => setTargetUser(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
                >
                  <option>Students / Young Adults</option>
                  <option>Beginners</option>
                  <option>Busy Professionals</option>
                  <option>General Fitness Users</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Country / Region
                </label>

                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
                >
                  <option>Mexico</option>
                  <option>Global</option>
                  <option>Latin America</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Search Keywords
                </label>

                <textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleResearch}
                className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Run Research
              </button>
            </div>
          </section>

          {/* Research Output */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600">
                2. Research Output
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Summary of global research, Mexico-specific insights, and human
                validation.
              </p>
            </div>

            {!hasRunResearch ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
                <div>
                  <div className="mb-3 text-4xl">🔎</div>

                  <h3 className="text-xl font-bold">
                    Your research will appear here
                  </h3>

                  <p className="mt-2 max-w-lg text-zinc-500">
                    Select your research preferences and click Run Research to
                    view the Week 2 research dashboard.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 rounded-xl bg-purple-50 px-4 py-3 text-sm text-purple-700">
                  Prototype research output based on the selected Week 2
                  research scope.
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <article className="rounded-2xl border border-zinc-200 p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
                      🌎
                    </div>

                    <h3 className="font-bold">5 Global Examples</h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Review popular fitness solutions from global markets and
                      identify useful patterns.
                    </p>
                  </article>

                  <article className="rounded-2xl border border-zinc-200 p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
                      📍
                    </div>

                    <h3 className="font-bold">Mexico Localization</h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Compare local fitness needs, market context, and
                      opportunities for Mexican users.
                    </p>
                  </article>

                  <article className="rounded-2xl border border-zinc-200 p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl">
                      💬
                    </div>

                    <h3 className="font-bold">
                      1 Human Validation Conversation
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      Use feedback from a real person to validate assumptions
                      and compare them with the research findings.
                    </p>
                  </article>
                </div>

                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="font-bold">Current Research Focus</h3>

                  <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                    <p>
                      <span className="font-semibold">Problem Area:</span>{" "}
                      {problemArea}
                    </p>

                    <p>
                      <span className="font-semibold">Target User:</span>{" "}
                      {targetUser}
                    </p>

                    <p>
                      <span className="font-semibold">Country:</span> {country}
                    </p>

                    <p>
                      <span className="font-semibold">Keywords:</span>{" "}
                      {keywords}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Competitor Table */}
        {hasRunResearch && (
          <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-purple-600">
                  3. Competitor & Substitute Table
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Compare existing solutions and alternatives users may choose
                  instead of Workout Planner.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, type, market..."
                  className="min-w-[260px] rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-purple-500"
                />

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500"
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-y border-zinc-200 bg-zinc-50 text-zinc-600">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Market</th>
                    <th className="px-4 py-3">Strength</th>
                    <th className="px-4 py-3">Weakness</th>
                    <th className="px-4 py-3">Notes</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCompetitors.map((competitor) => (
                    <tr
                      key={competitor.id}
                      className="border-b border-zinc-200 hover:bg-purple-50/40"
                    >
                      <td className="px-4 py-4">{competitor.id}</td>

                      <td className="px-4 py-4 font-semibold">
                        {competitor.name}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                          {competitor.type}
                        </span>
                      </td>

                      <td className="px-4 py-4">{competitor.market}</td>
                      <td className="px-4 py-4">{competitor.strength}</td>
                      <td className="px-4 py-4">{competitor.weakness}</td>

                      <td className="px-4 py-4 text-zinc-500">
                        {competitor.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Showing {filteredCompetitors.length} of {competitors.length}{" "}
              competitors and substitutes.
            </p>
          </section>
        )}

        {/* Benchmark Cards */}
        {hasRunResearch && (
          <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-purple-600">
              4. Benchmark Cards
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Quick comparison of selected solutions and important market
              benchmarks.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {benchmarkCards.map((benchmark) => (
                <article
                  key={benchmark.name}
                  className="rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{benchmark.name}</h3>
                      <p className="text-sm text-zinc-500">{benchmark.type}</p>
                    </div>

                    <span className="h-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      {benchmark.market}
                    </span>
                  </div>

                  <div className="mt-5 divide-y divide-zinc-200 text-sm">
                    <div className="flex justify-between py-3">
                      <span>Price</span>
                      <span>{benchmark.price}</span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span>Personalization</span>
                      <span>{benchmark.personalization}</span>
                    </div>

                    <div className="flex justify-between py-3">
                      <span>Content Quality</span>
                      <span>{benchmark.contentQuality}</span>
                    </div>

                    <div className="flex justify-between pt-3 font-bold">
                      <span>Overall</span>
                      <span className="text-purple-600">
                        {benchmark.overall}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Risk Map */}
        {hasRunResearch && (
          <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-purple-600">5. Risk Map</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Key risks that could affect Workout Planner based on the
              competitive research.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <p className="text-xs font-semibold text-amber-700">
                  HIGH IMPACT · LOW LIKELIHOOD
                </p>

                <h3 className="mt-3 font-bold">Market Changes</h3>

                <p className="mt-2 text-sm text-zinc-600">
                  Changes in fitness trends could reduce interest in certain
                  workout planning methods.
                </p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="text-xs font-semibold text-red-700">
                  HIGH IMPACT · HIGH LIKELIHOOD
                </p>

                <h3 className="mt-3 font-bold">Strong Competition</h3>

                <p className="mt-2 text-sm text-zinc-600">
                  Established fitness apps already offer large workout
                  libraries and personalized training.
                </p>
              </div>

              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <p className="text-xs font-semibold text-green-700">
                  LOW IMPACT · LOW LIKELIHOOD
                </p>

                <h3 className="mt-3 font-bold">Low Market Awareness</h3>

                <p className="mt-2 text-sm text-zinc-600">
                  A new student-built product may initially have limited
                  visibility.
                </p>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
                <p className="text-xs font-semibold text-purple-700">
                  LOW IMPACT · HIGH LIKELIHOOD
                </p>

                <h3 className="mt-3 font-bold">Price Sensitivity</h3>

                <p className="mt-2 text-sm text-zinc-600">
                  Students may prefer free fitness tools instead of paying for
                  workout planning features.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Save Research */}
        {hasRunResearch && (
          <section className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-purple-700">
                  Save Research Output
                </h2>

                <p className="mt-1 text-sm text-zinc-600">
                  Save this research record to Supabase so it can be reviewed
                  later.
                </p>
              </div>

              <button
                onClick={saveResearch}
                disabled={isSaving}
                className="rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 px-8 py-3 font-semibold text-white disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Research"}
              </button>
            </div>

            {saveMessage && (
              <p className="mt-4 font-medium text-purple-700">{saveMessage}</p>
            )}
          </section>
        )}

        {/* Saved Research */}
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-purple-600">
            6. Saved Research
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Your most recent research records saved in Supabase.
          </p>

          {savedResearch.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
              <p className="font-semibold">No saved research yet.</p>

              <p className="mt-1 text-sm text-zinc-500">
                Run the research dashboard and save your first research record.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedResearch.map((research) => (
                <article
                  key={research.id}
                  className="rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{research.problem_area}</h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {research.target_user}
                      </p>
                    </div>

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      {research.country}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">
                        Global Examples:
                      </span>{" "}
                      {research.global_examples_count}
                    </p>

                    <p>
                      <span className="font-semibold">Competitors:</span>{" "}
                      {research.competitor_count}
                    </p>

                    <p className="text-zinc-500">
                      {new Date(research.created_at).toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}