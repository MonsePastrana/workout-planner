"use client";

import Link from "next/link";
import { useState } from "react";
import CampaignTools from "./campaign-tools";
import SavedMarketingAssets from "./saved-marketing-assets";
import {
  audiences,
  filterAssets,
  formatAsset,
  marketingAssets,
  type MarketingAsset,
} from "../../lib/marketing-content";

const control =
  "rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700";

const button =
  `${control} font-semibold hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50`;

// Request a text download; the browser controls where/if it is saved.
function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" })
  );

  const link = document.createElement("a");

  try {
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }
}

function ContentCard({ asset }: { asset: MarketingAsset }) {
  const [message, setMessage] = useState("");
  const [copying, setCopying] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);

  async function copyContent() {
    setCopying(true);
    setMessage("");
    setManualCopy(false);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(formatAsset(asset));
      setMessage("Copied. You can now paste the content.");
    } catch {
      setManualCopy(true);
      setMessage(
        "Copy was blocked. Select and copy the text in the box below."
      );
    } finally {
      setCopying(false);
    }
  }

  function exportContent() {
    try {
      downloadText(
        formatAsset(asset),
        `workout-planner-${asset.id.toLowerCase()}.txt`
      );

      setMessage("Download requested. Check your browser downloads.");
    } catch {
      setMessage("Export failed. Please copy the content instead.");
    }
  }

  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-purple-700">
        {asset.id} | {asset.type}
      </p>

      <h3 className="mt-3 text-xl font-bold">{asset.title}</h3>

      <p className="mt-2 text-sm text-zinc-600">{asset.audience}</p>

      <p className="mt-1 text-sm font-semibold text-purple-800">
        {asset.channel}
      </p>

      <p className="mt-5 whitespace-pre-line break-words text-sm leading-7 text-zinc-700">
        {asset.content}
      </p>

      <p className="mt-5 rounded-xl bg-purple-50 p-4 text-sm font-semibold text-purple-900">
        CTA: {asset.cta}
      </p>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        <button
          type="button"
          onClick={copyContent}
          disabled={copying}
          aria-label={`Copy ${asset.id}`}
          className={button}
        >
          {copying ? "Copying..." : "Copy"}
        </button>

        <button
          type="button"
          onClick={exportContent}
          aria-label={`Export ${asset.id}`}
          className={button}
        >
          Export .txt
        </button>
      </div>

      <p
        role="status"
        aria-atomic="true"
        className="mt-3 min-h-6 text-sm text-purple-800"
      >
        {message}
      </p>

      {manualCopy && (
        <textarea
          readOnly
          value={formatAsset(asset)}
          rows={7}
          aria-label={`Manual copy text for ${asset.id}`}
          onFocus={(event) => event.currentTarget.select()}
          className={`mt-3 w-full ${control}`}
        />
      )}
    </article>
  );
}

export default function MarketingPage() {
  const [audience, setAudience] = useState("All");
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [exportMessage, setExportMessage] = useState("");

  const visibleAssets = filterAssets(audience, type, query);

  const postCount = marketingAssets.filter(
    (asset) => asset.type === "Social Post"
  ).length;

  const videoCount = marketingAssets.filter(
    (asset) => asset.type === "Video Script"
  ).length;

  function exportVisible() {
    if (visibleAssets.length === 0) return;

    try {
      const text = visibleAssets
        .map(formatAsset)
        .join("\n\n--------------------\n\n");

      downloadText(text, "workout-planner-marketing-selection.txt");

      setExportMessage(
        `Download requested for ${visibleAssets.length} assets. Check your browser downloads.`
      );
    } catch {
      setExportMessage(
        "Export failed. Try copying an individual card."
      );
    }
  }

  function resetFilters() {
    setAudience("All");
    setType("All");
    setQuery("");
    setExportMessage("");
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link
            href="/"
            className="text-xl font-black text-purple-800"
          >
            Workout Planner
          </Link>

          <nav
            aria-label="Marketing navigation"
            className="flex flex-wrap gap-4 text-sm font-semibold"
          >
            <Link href="/" className={button}>
              Home
            </Link>

            <a href="#marketing-tools" className={button}>
              Content Library
            </a>

            <Link href="/core" className={button}>
              Workout Generator
            </Link>
          </nav>
        </div>
      </header>

      {/* INTRODUCTION */}
      <section className="bg-purple-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-200">
            Week 4 | Marketing Engine
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            Marketing Studio
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-purple-100">
            Explore campaign drafts, choose your audience, and copy
            or export content for review.
          </p>

          <p className="mt-6 max-w-3xl rounded-xl border border-white/20 p-4 text-sm leading-6 text-purple-100">
            Prepared campaign drafts. No live AI model is called,
            and nothing is published to social media automatically.
          </p>

          <dl className="mt-7 flex flex-wrap gap-8">
            <div>
              <dt className="text-sm text-purple-200">Social posts</dt>
              <dd className="text-3xl font-black">{postCount}</dd>
            </div>

            <div>
              <dt className="text-sm text-purple-200">Video scripts</dt>
              <dd className="text-3xl font-black">{videoCount}</dd>
            </div>

            <div>
              <dt className="text-sm text-purple-200">
                Target audiences
              </dt>
              <dd className="text-3xl font-black">
                {audiences.length}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* BRAND SYSTEM */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl font-black">Brand System</h2>

        <p className="mt-3 text-lg text-purple-800">
          Train smarter. Plan better.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            [
              "Mission",
              "Make workout planning simple and accessible.",
            ],
            [
              "Voice",
              "Friendly, clear, supportive. No guaranteed fitness results.",
            ],
            [
              "Value",
              "Structured planning based on goals, experience, and availability.",
            ],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-5"
            >
              <h3 className="font-bold text-purple-800">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5">
          <h3 className="font-bold">Visual identity</h3>

          <div className="mt-4 flex flex-wrap gap-4">
            {[
              ["Purple 700", "bg-purple-700"],
              ["Purple 950", "bg-purple-950"],
              ["White", "bg-white"],
              ["Zinc 50", "bg-zinc-50"],
            ].map(([name, color]) => (
              <div
                key={name}
                className="flex items-center gap-2 text-sm"
              >
                <span
                  aria-hidden="true"
                  className={`h-8 w-8 rounded-lg border border-zinc-300 ${color}`}
                />
                {name}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-zinc-600">
            Typography: use the existing site font, bold headings,
            and readable body text.
          </p>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">Target Persona</h2>

          <p className="mt-3 text-sm text-zinc-600">
            Fictional planning personas, not research participants
            or verified customer profiles.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {[
              [
                "Alex | Students & Young Adults",
                "Primary audience",
                "Plan workouts around classes and other commitments.",
                "An unpredictable schedule and uncertainty about where to start.",
              ],
              [
                "Sam | Busy Professionals",
                "Secondary audience",
                "Organize training around work and limited free time.",
                "A crowded calendar and limited time for planning.",
              ],
            ].map(([name, priority, goal, barrier]) => (
              <article
                key={name}
                className="rounded-2xl bg-purple-50 p-6"
              >
                <p className="text-xs font-bold uppercase text-purple-700">
                  {priority}
                </p>

                <h3 className="mt-3 text-xl font-bold">{name}</h3>

                <p className="mt-4 text-sm leading-7">
                  <strong>Goal:</strong> {goal}
                </p>

                <p className="mt-2 text-sm leading-7">
                  <strong>Barrier:</strong> {barrier}
                </p>

                <p className="mt-2 text-sm leading-7">
                  <strong>Need:</strong> A clear starting point with
                  choices for available time and experience.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LANDING PAGE COPY */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl font-black">Landing Page Copy</h2>

        <div className="mt-7 rounded-2xl border border-purple-200 bg-purple-50 p-7">
          <h3 className="text-3xl font-black text-purple-950">
            Build a workout that fits your life.
          </h3>

          <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
            Turn your goals, experience, and available time into a
            structured workout proposal. Spend less time figuring out
            where to start.
          </p>

          <ul className="mt-5 list-inside list-disc space-y-2 text-sm text-zinc-700">
            <li>
              Start with your planning goal and experience level.
            </li>
            <li>
              Choose training days and your preferred workout duration.
            </li>
            <li>
              Review a proposal before deciding how to use it.
            </li>
          </ul>

          <Link
            href="/core"
            className={`mt-6 inline-block ${button}`}
          >
            Build My Workout
          </Link>
        </div>
      </section>

      {/* CONTENT LIBRARY */}
      <section
        id="marketing-tools"
        className="mx-auto max-w-7xl scroll-mt-6 px-6 pb-14"
      >
        <h2 className="text-3xl font-black">Content Library</h2>

        <p className="mt-3 text-zinc-600">
          Copy or export draft text. Video scripts are not finished
          videos.
        </p>

        <div className="mt-7 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-5 md:grid-cols-3">
          <label className="text-sm font-semibold">
            Audience
            <select
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              className={`mt-2 w-full ${control}`}
            >
              <option value="All">All audiences</option>
              {audiences.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold">
            Content type
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className={`mt-2 w-full ${control}`}
            >
              <option value="All">All content</option>
              <option value="Social Post">Social posts</option>
              <option value="Video Script">Video scripts</option>
            </select>
          </label>

          <label className="text-sm font-semibold">
            Search
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, text, channel, or ID"
              className={`mt-2 w-full ${control}`}
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p role="status" className="text-sm text-zinc-600">
            Showing {visibleAssets.length} of {marketingAssets.length} assets
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className={button}
            >
              Reset filters
            </button>

            <button
              type="button"
              onClick={exportVisible}
              disabled={visibleAssets.length === 0}
              className={button}
            >
              Export displayed .txt
            </button>
          </div>
        </div>

        <p
          role="status"
          aria-atomic="true"
          className="mt-3 min-h-6 text-sm text-purple-800"
        >
          {exportMessage}
        </p>

        {visibleAssets.length > 0 ? (
          <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
            {visibleAssets.map((asset) => (
              <ContentCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center">
            No matching content. Try another search or reset the filters.
          </p>
        )}
      </section>

           <CampaignTools onExport={downloadText} />

      <SavedMarketingAssets onExport={downloadText} />

      <footer className="bg-purple-950 px-6 py-8 text-center text-sm leading-7 text-purple-100">
        <p>Workout Planner | Week 4</p>
        <p>
          Prepared content, manual A/B comparison, and guest-session
          marketing storage.
        </p>
      </footer>
    </main>
  );
}