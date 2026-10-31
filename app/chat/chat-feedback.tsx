"use client";

import { useEffect, useRef, useState } from "react";
import type { Intake } from "../../lib/chat-rules";
import {
  chatStorageError,
  loadChatTests,
  saveChatTest,
  type ChatTestRecord,
  type Rating,
  type ResponseCategory,
  type TesterLabel,
} from "../../lib/chat-storage";

const button =
  "rounded-xl border border-purple-300 bg-white px-4 py-3 text-sm font-bold text-purple-800 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-purple-700";

const testers: TesterLabel[] = [
  "Self test",
  "External tester 1",
  "External tester 2",
  "External tester 3",
];

export default function ChatFeedback({
  intake,
  responseCategory,
}: {
  intake: Intake;
  responseCategory: ResponseCategory;
}) {
  const [rating, setRating] = useState<Rating | "">("");
  const [testerLabel, setTesterLabel] = useState<TesterLabel>("Self test");
  const [saved, setSaved] = useState<ChatTestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [savedId, setSavedId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const locked = useRef(false);
  const runId = useRef<string>("");

  useEffect(() => {
    let active = true;
    loadChatTests()
      .then((rows) => {
        if (!active) return;
        setSaved(rows);
        setReady(true);
      })
      .catch((issue: unknown) => {
        if (active) setError(chatStorageError(issue));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function save() {
    if (!rating || !ready || saving || loading || savedId || locked.current) {
      return;
    }

    locked.current = true;
    setSaving(true);
    setError("");
    setMessage("");
    if (!runId.current) runId.current = crypto.randomUUID();

    try {
      const result = await saveChatTest({
        runId: runId.current,
        testerLabel,
        intake,
        responseCategory,
        rating,
      });
      setSavedId(result.record.id);
      setSaved((rows) => [
        result.record,
        ...rows.filter((row) => row.id !== result.record.id),
      ].slice(0, 20));
      setMessage(
        result.created
          ? "Test summary saved to Supabase. Refresh the page to check persistence."
          : "This test summary was already saved; no duplicate was created."
      );
    } catch (issue) {
      setError(chatStorageError(issue));
    } finally {
      setSaving(false);
      locked.current = false;
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6" aria-labelledby="feedback-title">
      <h2 id="feedback-title" className="text-2xl font-black">
        Rate and save this assistant test
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
        Rate the guidance you just saw. Save a short test summary for your
        school project. Only selected options, response category, and rating
        are stored; the free-text question is NOT saved. Do not enter names,
        contact details, or medical information. A new guest session is
        created only when you press Save, and its records remain tied to
        this browser and website address.
      </p>

      <div className="mt-5">
        <p className="text-sm font-bold">Was this response helpful?</p>
        <div className="mt-3 flex flex-wrap gap-3" role="group" aria-label="Rate the assistant response">
          <button
            type="button"
            aria-pressed={rating === "up"}
            disabled={Boolean(savedId) || saving}
            className={`${button} ${rating === "up" ? "ring-2 ring-purple-700" : ""}`}
            onClick={() => setRating("up")}
          >
            Helpful (thumbs up)
          </button>
          <button
            type="button"
            aria-pressed={rating === "down"}
            disabled={Boolean(savedId) || saving}
            className={`${button} ${rating === "down" ? "ring-2 ring-purple-700" : ""}`}
            onClick={() => setRating("down")}
          >
            Not helpful (thumbs down)
          </button>
        </div>
      </div>

      <label className="mt-6 block max-w-sm text-sm font-bold">
        Test participant (no name required)
        <select
          value={testerLabel}
          disabled={Boolean(savedId) || saving}
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-purple-700"
          onChange={(event) => setTesterLabel(event.target.value as TesterLabel)}
        >
          {testers.map((tester) => (
            <option key={tester} value={tester}>{tester}</option>
          ))}
        </select>
      </label>

      <p className="mt-4 text-xs text-zinc-500">
        Selecting an external tester label is not proof that a person tested
        the site. Record three actual external tests separately for submission.
      </p>

      <button
        type="button"
        className={`mt-5 ${button}`}
        disabled={!rating || !ready || loading || saving || Boolean(savedId)}
        onClick={save}
      >
        {saving ? "Saving..." : savedId ? "Test saved" : "Save test summary to Supabase"}
      </button>

      {loading && <p role="status" className="mt-4 text-sm">Loading saved tests...</p>}
      {message && <p role="status" className="mt-4 text-sm text-purple-800">{message}</p>}
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}

      <h3 className="mt-9 text-xl font-black">Saved tests from this browser</h3>
      {!loading && ready && saved.length === 0 && (
        <p className="mt-3 text-sm text-zinc-600">No test summaries saved yet.</p>
      )}
      {!loading && !ready && (
        <p className="mt-3 text-sm text-zinc-600">Saved tests could not be loaded. Review the error above and reload.</p>
      )}
      {!loading && ready && saved.length > 0 && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {saved.map((row) => (
            <li key={row.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
              <p className="font-bold text-purple-800">{row.tester_label}</p>
              <p className="mt-2">{row.goal} | {row.level}</p>
              <p>{row.days_per_week} days | {row.duration_minutes} minutes</p>
              <p>Response: {row.response_category} | Rating: {row.rating === "up" ? "Helpful" : "Not helpful"}</p>
              <p className="mt-2 text-xs text-zinc-500">
                <time dateTime={row.created_at}>{new Date(row.created_at).toLocaleString()}</time>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
