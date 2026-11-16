"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadChatTests, type ChatTestRecord } from "../../lib/chat-storage";
import {
  loadMarketingAssets,
  type SavedMarketingAsset,
} from "../../lib/marketing-storage";

type LoadState = "loading" | "ready" | "error";

const linkStyle =
  "rounded-xl border border-purple-200 bg-white px-4 py-2 font-semibold text-purple-800 hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-purple-700";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
}

export default function DashboardPage() {
  const [chatTests, setChatTests] = useState<ChatTestRecord[]>([]);
  const [assets, setAssets] = useState<SavedMarketingAsset[]>([]);
  const [chatStatus, setChatStatus] = useState<LoadState>("loading");
  const [marketingStatus, setMarketingStatus] = useState<LoadState>("loading");

  useEffect(() => {
    let active = true;
    void loadChatTests()
      .then((items) => {
        if (!active) return;
        setChatTests(items);
        setChatStatus("ready");
      })
      .catch(() => {
        if (active) setChatStatus("error");
      });
    void loadMarketingAssets()
      .then((items) => {
        if (!active) return;
        setAssets(items);
        setMarketingStatus("ready");
      })
      .catch(() => {
        if (active) setMarketingStatus("error");
      });
    return () => { active = false; };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="text-xl font-black text-purple-800">Workout Planner</Link>
          <Link href="/demo" className={linkStyle}>Guided Demo</Link>
        </div>
        <nav aria-label="Dashboard navigation" className="mx-auto flex max-w-6xl flex-wrap gap-4 px-6 pb-5 text-sm">
          <Link href="/" className={linkStyle}>Home</Link>
          <Link href="/core" className={linkStyle}>Workout Generator</Link>
          <Link href="/chat" className={linkStyle}>Guided Assistant</Link>
          <Link href="/marketing" className={linkStyle}>Marketing Studio</Link>
          <Link href="/docs" className={linkStyle}>Docs</Link>
        </nav>
      </header>

      <section className="border-b border-purple-100 bg-purple-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-bold uppercase tracking-widest text-purple-800">Module 6 / Saved Activity</p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">Your saved activity</h1>
          <p className="mt-5 max-w-3xl leading-8 text-zinc-700">
            Review the marketing assets and Guided Assistant test summaries available to your
            browser&apos;s separate anonymous guest sessions. No real-user data is shown as a demo example.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
        <section aria-label="Storage overview" className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-purple-200 p-6">
            <p className="text-sm font-semibold text-zinc-600">Guided Assistant summaries</p>
            <p className="mt-2 text-3xl font-black text-purple-800" aria-live="polite">
              {chatStatus === "ready" ? chatTests.length : "—"}
            </p>
            <p className="mt-2 text-sm text-zinc-500">Up to 20 most recent records</p>
          </div>
          <div className="rounded-2xl border border-purple-200 p-6">
            <p className="text-sm font-semibold text-zinc-600">Saved marketing assets</p>
            <p className="mt-2 text-3xl font-black text-purple-800" aria-live="polite">
              {marketingStatus === "ready" ? assets.length : "—"}
            </p>
            <p className="mt-2 text-sm text-zinc-500">Up to 13 most recent records</p>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200 p-6 sm:p-8" aria-labelledby="chat-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="chat-heading" className="text-2xl font-black">Guided Assistant feedback</h2>
            <Link href="/chat" className={linkStyle}>Open Assistant</Link>
          </div>
          {chatStatus === "loading" ? (
            <p role="status" className="mt-6 text-zinc-600">Loading assistant summaries...</p>
          ) : chatStatus === "error" ? (
            <p role="alert" className="mt-6 text-red-700">Could not load these records. Check the connection and try refreshing.</p>
          ) : chatTests.length === 0 ? (
            <p className="mt-6 text-zinc-600">No assistant tests found in this browser&apos;s chat guest session.</p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {chatTests.map((item) => (
                <li key={item.id} className="rounded-xl bg-zinc-50 p-5">
                  <h3 className="font-bold text-purple-900">{item.goal}</h3>
                  <p className="mt-2 text-sm text-zinc-700">
                    {item.level} · {item.days_per_week} days/week · {item.duration_minutes} minutes
                  </p>
                  <p className="mt-2 text-sm text-zinc-700">Response: {item.response_category} · Rating: {item.rating === "up" ? "Helpful" : "Not helpful"}</p>
                  <p className="mt-3 text-xs text-zinc-500">{formatDate(item.created_at)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-zinc-200 p-6 sm:p-8" aria-labelledby="marketing-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="marketing-heading" className="text-2xl font-black">Saved marketing content</h2>
            <Link href="/marketing" className={linkStyle}>Open Marketing</Link>
          </div>
          {marketingStatus === "loading" ? (
            <p role="status" className="mt-6 text-zinc-600">Loading saved marketing assets...</p>
          ) : marketingStatus === "error" ? (
            <p role="alert" className="mt-6 text-red-700">Could not load marketing records. Check the connection and try refreshing.</p>
          ) : assets.length === 0 ? (
            <p className="mt-6 text-zinc-600">No marketing assets found in this browser&apos;s marketing guest session.</p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {assets.map((asset) => (
                <li key={asset.id} className="rounded-xl bg-zinc-50 p-5">
                  <h3 className="font-bold text-purple-900">{asset.title}</h3>
                  <p className="mt-2 text-sm text-zinc-700">{asset.asset_type} · {asset.audience} · {asset.channel}</p>
                  <p className="mt-3 text-xs text-zinc-500">{formatDate(asset.created_at)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-xl font-black text-purple-900">About saved workouts and research</h2>
          <p className="mt-3 leading-7 text-zinc-700">
            Saved workouts and research remain accessible in their original modules. They are not
            combined into this dashboard until their database access policies and ownership model
            can be verified. This prevents showing unrelated users&apos; records as personal information.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/core" className={linkStyle}>View Workouts</Link>
            <Link href="/research" className={linkStyle}>View Research</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
