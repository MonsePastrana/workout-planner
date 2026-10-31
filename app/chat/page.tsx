"use client";

import Link from "next/link";
import {
  useReducer,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  answerQuestion,
  buildGuidance,
  days,
  durations,
  goals,
  levels,
  type DayOption,
  type DurationOption,
  type Goal,
  type Intake,
  type Level,
} from "../../lib/chat-rules";

const button =
  "rounded-xl border border-purple-300 bg-white px-5 py-3 font-semibold text-purple-800 hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 disabled:cursor-not-allowed disabled:opacity-50";

const field =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-purple-700";

type ChatState = {
  step: 0 | 1 | 2 | 3;
  goal: Goal | "";
  level: Level | "";
  days: DayOption | "";
  duration: DurationOption | "";
  confirmed: boolean;
};

type Action =
  | { type: "goal"; value: Goal }
  | { type: "level"; value: Level }
  | { type: "days"; value: DayOption | "" }
  | { type: "duration"; value: DurationOption | "" }
  | { type: "complete" }
  | { type: "confirm" }
  | { type: "reset" };

const initialState: ChatState = {
  step: 0,
  goal: "",
  level: "",
  days: "",
  duration: "",
  confirmed: false,
};

function reducer(state: ChatState, action: Action): ChatState {
  if (action.type === "reset") return initialState;

  if (action.type === "goal" && state.step === 0) {
    return {
      ...state,
      goal: action.value,
      step: 1,
    };
  }

  if (action.type === "level" && state.step === 1) {
    return {
      ...state,
      level: action.value,
      step: 2,
    };
  }

  if (action.type === "days" && state.step === 2) {
    return {
      ...state,
      days: action.value,
    };
  }

  if (action.type === "duration" && state.step === 2) {
    return {
      ...state,
      duration: action.value,
    };
  }

  if (
    action.type === "complete" &&
    state.step === 2 &&
    state.goal &&
    state.level &&
    state.days &&
    state.duration
  ) {
    return {
      ...state,
      step: 3,
    };
  }

  if (action.type === "confirm" && state.step === 3) {
    return {
      ...state,
      confirmed: true,
    };
  }

  return state;
}

function Message({
  user = false,
  children,
}: {
  user?: boolean;
  children: ReactNode;
}) {
  return (
    <li
      className={`max-w-xl rounded-2xl p-5 ${
        user
          ? "ml-auto bg-purple-700 text-white"
          : "border border-zinc-200 bg-white text-zinc-800"
      }`}
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-wide">
        {user ? "You" : "Workout Planner Assistant"}
      </p>

      <div className="text-sm leading-7">{children}</div>
    </li>
  );
}

export default function ChatPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState<ReturnType<
    typeof answerQuestion
  > | null>(null);

  const intake: Intake | null =
    state.goal &&
    state.level &&
    state.days &&
    state.duration
      ? {
          goal: state.goal,
          level: state.level,
          days: state.days,
          duration: state.duration,
        }
      : null;

  const summary = [
    ["Goal", state.goal],
    ["Experience", state.level],
    ["Days per week", state.days],
    [
      "Duration",
      state.duration ? `${state.duration} minutes` : "",
    ],
  ];

  function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!intake || !state.confirmed) return;

    setReply(answerQuestion(question, intake));
  }

  function restart() {
    dispatch({ type: "reset" });
    setQuestion("");
    setReply(null);
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-black text-purple-800"
          >
            Workout Planner
          </Link>

          <nav
            aria-label="Assistant navigation"
            className="flex flex-wrap gap-3 text-sm"
          >
            <Link href="/" className={button}>
              Home
            </Link>

            <Link href="/core" className={button}>
              Workout Generator
            </Link>
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
          Answer three questions about your workout planning
          preferences. This assistant uses predefined rules, not a
          live AI model.
        </p>

        <p className="mt-4 rounded-xl bg-purple-50 p-4 text-sm leading-6 text-purple-900">
          Do not enter medical information. This tool supports
          workout organization and does not replace a trainer,
          doctor, or other qualified professional.
        </p>

        <ol
          aria-label="Conversation"
          className="mt-8 space-y-4"
        >
          <Message>
            Hi! First, what is your workout planning goal?
          </Message>

          {state.step >= 1 && (
            <>
              <Message user>{state.goal}</Message>

              <Message>
                What is your experience level?
              </Message>
            </>
          )}

          {state.step >= 2 && (
            <>
              <Message user>{state.level}</Message>

              <Message>
                What schedule works for you? Choose training
                days per week and a preferred workout duration.
              </Message>
            </>
          )}

          {state.step === 3 && (
            <Message user>
              {state.days} days per week, {state.duration} minutes
              per workout.
            </Message>
          )}
        </ol>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2
            role="status"
            className="text-xl font-bold"
          >
            {state.step < 3
              ? `Question ${state.step + 1} of 3`
              : "Intake complete"}
          </h2>

          {state.step === 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  className={button}
                  onClick={() =>
                    dispatch({
                      type: "goal",
                      value: goal,
                    })
                  }
                >
                  {goal}
                </button>
              ))}
            </div>
          )}

          {state.step === 1 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {levels.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={button}
                  onClick={() =>
                    dispatch({
                      type: "level",
                      value: level,
                    })
                  }
                >
                  {level}
                </button>
              ))}
            </div>
          )}

          {state.step === 2 && (
            <form
              className="mt-5"
              onSubmit={(event) => {
                event.preventDefault();

                dispatch({
                  type: "complete",
                });
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Days per week

                  <select
                    required
                    className={field}
                    value={state.days}
                    onChange={(event) =>
                      dispatch({
                        type: "days",
                        value: event.target
                          .value as DayOption | "",
                      })
                    }
                  >
                    <option value="">Choose days</option>

                    {days.map((value) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {value} days
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-semibold">
                  Workout duration

                  <select
                    required
                    className={field}
                    value={state.duration}
                    onChange={(event) =>
                      dispatch({
                        type: "duration",
                        value: event.target
                          .value as DurationOption | "",
                      })
                    }
                  >
                    <option value="">
                      Choose duration
                    </option>

                    {durations.map((value) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {value} minutes
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className={`mt-5 ${button}`}
                disabled={
                  !state.days || !state.duration
                }
              >
                Finish intake
              </button>
            </form>
          )}

          {state.step === 3 && (
            <>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {summary.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-purple-50 p-4"
                  >
                    <dt className="text-xs font-semibold uppercase text-purple-700">
                      {label}
                    </dt>

                    <dd className="mt-2 font-bold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {!state.confirmed ? (
                <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
                  <p className="font-bold text-amber-900">
                    Human checkpoint
                  </p>

                  <p className="mt-2 text-sm leading-7 text-amber-900">
                    Review these preferences before the assistant
                    provides guidance. You remain responsible for
                    deciding whether the selections are correct.
                  </p>

                  <button
                    type="button"
                    className={`mt-4 ${button}`}
                    onClick={() =>
                      dispatch({
                        type: "confirm",
                      })
                    }
                  >
                    These preferences are correct
                  </button>
                </div>
              ) : (
                intake && (
                  <div className="mt-6 rounded-xl bg-purple-950 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wide text-purple-200">
                      Guided response
                    </p>

                    <p className="mt-3 leading-7">
                      {buildGuidance(intake)}
                    </p>

                    <Link
                      href="/core"
                      className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-bold text-purple-900"
                    >
                      Open Workout Generator
                    </Link>
                  </div>
                )
              )}
            </>
          )}
        </section>

        {state.confirmed && intake && (
          <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-2xl font-black">
              Ask the guided assistant
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Ask about your goal, experience, schedule,
              duration, or next step.
            </p>

            <form
              onSubmit={askQuestion}
              className="mt-5"
            >
              <label className="text-sm font-semibold">
                Your question

                <textarea
                  rows={3}
                  maxLength={500}
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                    setReply(null);
                  }}
                  placeholder="Example: What should I do next?"
                  className={field}
                />
              </label>

              <button
                type="submit"
                className={`mt-4 ${button}`}
              >
                Send question
              </button>
            </form>

            {reply && (
              <div
                role={
                  reply.category === "guardrail"
                    ? "alert"
                    : "status"
                }
                className={`mt-6 rounded-xl p-5 ${
                  reply.category === "guardrail"
                    ? "border border-red-200 bg-red-50 text-red-900"
                    : "bg-purple-50 text-zinc-800"
                }`}
              >
                <p className="font-bold">
                  {reply.title}
                </p>

                <p className="mt-2 text-sm leading-7">
                  {reply.message}
                </p>
              </div>
            )}
          </section>
        )}

        <button
          type="button"
          className={`mt-8 ${button}`}
          onClick={restart}
        >
          Restart conversation
        </button>
      </main>
    </div>
  );
}