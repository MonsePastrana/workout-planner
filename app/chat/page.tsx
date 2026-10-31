"use client";

import Link from "next/link";
import { useReducer, type ReactNode } from "react";

const goals = ["Muscle Gain", "Strength", "General Fitness", "Weight Loss"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const days = ["2", "3", "4", "5"];
const durations = ["30", "45", "60"];

const button =
  "rounded-xl border border-purple-300 bg-white px-5 py-3 font-semibold text-purple-800 hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 disabled:cursor-not-allowed disabled:opacity-50";

const field =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-purple-700";

type ChatState = {
  step: 0 | 1 | 2 | 3;
  goal: string;
  level: string;
  days: string;
  duration: string;
};

type Action =
  | { type: "goal" | "level" | "days" | "duration"; value: string }
  | { type: "complete" | "reset" };

const initialState: ChatState = {
  step: 0,
  goal: "",
  level: "",
  days: "",
  duration: "",
};

// Only valid answers can advance the conversation.
function reducer(state: ChatState, action: Action): ChatState {
  if (action.type === "reset") return { ...initialState };

  if (action.type === "goal" && state.step === 0 && goals.includes(action.value)) {
    return { ...state, goal: action.value, step: 1 };
  }

  if (action.type === "level" && state.step === 1 && levels.includes(action.value)) {
    return { ...state, level: action.value, step: 2 };
  }

  if (action.type === "days" && state.step === 2 && ["", ...days].includes(action.value)) {
    return { ...state, days: action.value };
  }

  if (action.type === "duration" && state.step === 2 && ["", ...durations].includes(action.value)) {
    return { ...state, duration: action.value };
  }

  if (
    action.type === "complete" &&
    state.step === 2 &&
    days.includes(state.days) &&
    durations.includes(state.duration)
  ) {
    return { ...state, step: 3 };
  }

  return state;
}

function Message({ user = false, children }: { user?: boolean; children: ReactNode }) {
  return (
    <li className={`max-w-xl rounded-2xl p-5 ${user ? "ml-auto bg-purple-700 text-white" : "border border-zinc-200 bg-white text-zinc-800"}`}>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide">
        {user ? "You" : "Workout Planner Assistant"}
      </p>
      <div className="text-sm leading-7">{children}</div>
    </li>
  );
}

export default function ChatPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const summary = [
    ["Goal", state.goal],
    ["Experience", state.level],
    ["Days per week", state.days],
    ["Duration", `${state.duration} minutes`],
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-xl font-black text-purple-800">
            Workout Planner
          </Link>
          <nav aria-label="Assistant navigation" className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className={button}>Home</Link>
            <Link href="/marketing" className={button}>Marketing</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm font-bold uppercase tracking-widest text-purple-700">
          Week 5 | Guided Assistant
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          Find your starting point.
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
          Answer three questions about your workout planning preferences.
          This is a guided tool, not a live AI model or personal trainer.
        </p>
        <p className="mt-4 rounded-xl bg-purple-50 p-4 text-sm leading-6 text-purple-900">
          Current prototype: intake only. Guidance, human review, feedback,
          and database saving will be added in the next steps.
          Do not enter personal or medical information.
        </p>

        <ol aria-label="Conversation" className="mt-8 space-y-4">
          <Message>Hi! First, what is your workout planning goal?</Message>
          {state.step >= 1 && (
            <>
              <Message user>{state.goal}</Message>
              <Message>What is your experience level?</Message>
            </>
          )}
          {state.step >= 2 && (
            <>
              <Message user>{state.level}</Message>
              <Message>
                What schedule works for you? Choose training days per week
                and a preferred workout duration.
              </Message>
            </>
          )}
          {state.step === 3 && (
            <Message user>
              {state.days} days per week, {state.duration} minutes per workout.
            </Message>
          )}
        </ol>

        <section aria-labelledby="current-question" className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 id="current-question" role="status" className="text-xl font-bold">
            {state.step < 3 ? `Question ${state.step + 1} of 3` : "Intake complete"}
          </h2>

          {state.step === 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {goals.map((goal) => (
                <button key={goal} type="button" className={button}
                  onClick={() => dispatch({ type: "goal", value: goal })}>
                  {goal}
                </button>
              ))}
            </div>
          )}

          {state.step === 1 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {levels.map((level) => (
                <button key={level} type="button" className={button}
                  onClick={() => dispatch({ type: "level", value: level })}>
                  {level}
                </button>
              ))}
            </div>
          )}

          {state.step === 2 && (
            <form className="mt-5" onSubmit={(event) => {
              event.preventDefault();
              dispatch({ type: "complete" });
            }}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Days per week
                  <select required className={field} value={state.days}
                    onChange={(event) => dispatch({ type: "days", value: event.target.value })}>
                    <option value="">Choose days</option>
                    {days.map((value) => <option key={value} value={value}>{value} days</option>)}
                  </select>
                </label>
                <label className="text-sm font-semibold">
                  Workout duration
                  <select required className={field} value={state.duration}
                    onChange={(event) => dispatch({ type: "duration", value: event.target.value })}>
                    <option value="">Choose duration</option>
                    {durations.map((value) => <option key={value} value={value}>{value} minutes</option>)}
                  </select>
                </label>
              </div>
              <button type="submit" className={`mt-5 ${button}`}
                disabled={!state.days || !state.duration}>
                Finish intake
              </button>
            </form>
          )}

          {state.step === 3 && (
            <>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {summary.map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-purple-50 p-4">
                    <dt className="text-xs font-semibold uppercase text-purple-700">{label}</dt>
                    <dd className="mt-2 font-bold">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm leading-7 text-zinc-600">
                These are your selected preferences, not a workout recommendation.
                Nothing has been saved to the database.
              </p>
            </>
          )}
        </section>

        <button type="button" className={`mt-6 ${button}`}
          onClick={() => dispatch({ type: "reset" })}>
          Restart conversation
        </button>
        <p className="mt-4 text-sm text-zinc-500">
          This prototype keeps answers only while the page is open.
          Reloading or restarting clears them.
        </p>
      </main>
    </div>
  );
}
