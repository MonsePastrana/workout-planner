"use client";

import Link from "next/link";
import { useState } from "react";

const steps = [
  {
    title: "Build a workout",
    category: "Workout Generator",
    href: "/core",
    linkLabel: "Open Workout Generator",
    description:
      "Choose a fitness goal, experience level, weekly schedule, and workout duration. The generator organizes those preferences into a proposed routine.",
    action:
      "Try creating a routine. Review the exercises and decide whether it fits your availability.",
  },
  {
    title: "Explore the research",
    category: "Research & Benchmarking",
    href: "/research",
    linkLabel: "Open Research",
    description:
      "Review competitor examples, market insights, and the problems Workout Planner aims to address.",
    action:
      "Explore the research tools and identify one design opportunity or risk.",
  },
  {
    title: "Understand the business model",
    category: "Product & Pricing",
    href: "/pricing",
    linkLabel: "Open Pricing Simulator",
    description:
      "Compare hypothetical pricing and revenue scenarios. These are planning simulations, not real sales results.",
    action:
      "Change a pricing assumption and observe how the simulated outcome changes.",
  },
  {
    title: "Discover the Marketing Studio",
    category: "Marketing",
    href: "/marketing",
    linkLabel: "Open Marketing Studio",
    description:
      "Browse prepared promotional content, a campaign calendar, and headline comparison tools.",
    action:
      "Filter the content library or try the A/B calculator. Demo counts are simulated.",
  },
  {
    title: "Try the Guided Assistant",
    category: "Guided Assistant",
    href: "/chat",
    linkLabel: "Open Guided Assistant",
    description:
      "Answer three workout preference questions, confirm your selections, and review rule-based guidance. This is not a live AI coach.",
    action:
      "Finish the intake, confirm your choices, then ask a supported follow-up question.",
  },
  {
    title: "Review the project documentation",
    category: "Documentation",
    href: "/docs",
    linkLabel: "Open Documentation",
    description:
      "Read about the project's design and implementation. Additional Module 6 development records will be added as they are completed.",
    action:
      "Review the documented decisions, limitations, and planned improvements.",
  },
] as const;

const control =
  "rounded-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700";

export default function DemoPage() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className={`text-xl font-black text-purple-800 ${control}`}>
            Workout Planner
          </Link>
          <Link
            href="/core"
            className={`bg-purple-700 px-5 py-3 text-sm text-white hover:bg-purple-800 ${control}`}
          >
            Build My Workout
          </Link>
        </div>
        <nav aria-label="Demo navigation" className="mx-auto flex max-w-6xl gap-6 px-6 pb-5 text-sm font-semibold">
          <Link href="/" className={`text-zinc-600 hover:text-purple-800 ${control}`}>Home</Link>
          <Link href="/chat" className={`text-zinc-600 hover:text-purple-800 ${control}`}>Assistant</Link>
          <Link href="/docs" className={`text-zinc-600 hover:text-purple-800 ${control}`}>Docs</Link>
          <span aria-current="page" className="text-purple-800">Demo</span>
        </nav>
      </header>

      <section className="border-b border-purple-100 bg-purple-50">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-800">Module 6 · Guided Demo</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
            Explore Workout Planner, one step at a time.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">
            This guided walkthrough introduces the features built in previous modules. Follow the six steps, then open a feature to try it yourself.
          </p>
        </div>
      </section>

      <section aria-labelledby="walkthrough-heading" className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <h2 id="walkthrough-heading" className="text-2xl font-black">Guided walkthrough</h2>
          <p aria-live="polite" className="font-semibold text-purple-800">Step {index + 1} of {steps.length}</p>
        </div>
        <div
          aria-label="Walkthrough progress"
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={index + 1}
          role="progressbar"
          className="h-3 overflow-hidden rounded-full bg-purple-100"
        >
          <div
            className="h-full rounded-full bg-purple-700 transition-all"
            style={{ width: `${((index + 1) / steps.length) * 100}%` }}
          />
        </div>

        <article className="mt-8 rounded-3xl border border-purple-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-700">{step.category}</p>
          <h3 className="mt-3 text-3xl font-black">{step.title}</h3>
          <p className="mt-5 max-w-3xl leading-8 text-zinc-700">{step.description}</p>
          <div className="mt-8 rounded-2xl border border-purple-100 bg-purple-50 p-5">
            <p className="text-sm font-bold text-purple-900">Try it yourself</p>
            <p className="mt-2 leading-7 text-zinc-800">{step.action}</p>
          </div>
          <Link
            href={step.href}
            className={`mt-8 inline-block bg-purple-700 px-6 py-3 text-white hover:bg-purple-800 ${control}`}
          >
            {step.linkLabel}
          </Link>
        </article>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            disabled={isFirst}
            className={`border border-purple-200 bg-white px-6 py-3 text-purple-800 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40 ${control}`}
          >
            Previous
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={() => setIndex(0)}
              className={`bg-purple-700 px-6 py-3 text-white hover:bg-purple-800 ${control}`}
            >
              Restart demo
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((current) => Math.min(steps.length - 1, current + 1))}
              className={`bg-purple-700 px-6 py-3 text-white hover:bg-purple-800 ${control}`}
            >
              Next step
            </button>
          )}
        </div>
        <p className="mt-8 text-sm leading-6 text-zinc-600">
          Workout Planner provides planning support, not medical advice or individual coaching. The walkthrough does not save user information.
        </p>
      </section>
    </main>
  );
}
