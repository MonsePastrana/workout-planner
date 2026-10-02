"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type ScenarioType = "Conservative" | "Growth";
type CustomerSegment = "Students & Young Adults" | "Busy Professionals";

type SavedScenario = {
  id: string;
  scenario_name: string;
  scenario_type: string;
  customer_segment: string;
  free_users: number;
  plus_users: number;
  pro_users: number;
  plus_price: number;
  pro_price: number;
  monthly_revenue: number;
  annual_revenue: number;
  created_at: string;
};

const scenarioDefaults = {
  Conservative: {
    customerSegment: "Students & Young Adults" as CustomerSegment,
    freeUsers: 150,
    plusUsers: 25,
    proUsers: 8,
    plusPrice: 4.99,
    proPrice: 8.99,
  },

  Growth: {
    customerSegment: "Busy Professionals" as CustomerSegment,
    freeUsers: 300,
    plusUsers: 70,
    proUsers: 25,
    plusPrice: 7.99,
    proPrice: 12.99,
  },
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function PricingPage() {
  const [scenarioName, setScenarioName] = useState("Week 3 Scenario");
  const [scenarioType, setScenarioType] =
    useState<ScenarioType>("Conservative");

  const [customerSegment, setCustomerSegment] =
    useState<CustomerSegment>("Students & Young Adults");

  const [freeUsers, setFreeUsers] = useState(150);
  const [plusUsers, setPlusUsers] = useState(25);
  const [proUsers, setProUsers] = useState(8);

  const [plusPrice, setPlusPrice] = useState(4.99);
  const [proPrice, setProPrice] = useState(8.99);

  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

  const [saving, setSaving] = useState(false);
  const [loadingScenarios, setLoadingScenarios] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const monthlyRevenue = useMemo(() => {
    return plusUsers * plusPrice + proUsers * proPrice;
  }, [plusUsers, plusPrice, proUsers, proPrice]);

  const annualRevenue = useMemo(() => {
    return monthlyRevenue * 12;
  }, [monthlyRevenue]);

  const totalUsers = freeUsers + plusUsers + proUsers;

  const paidUsers = plusUsers + proUsers;

  const paidConversion =
    totalUsers > 0 ? (paidUsers / totalUsers) * 100 : 0;

  const averageRevenuePerUser =
    totalUsers > 0 ? monthlyRevenue / totalUsers : 0;

  const loadSavedScenarios = useCallback(async () => {
    setLoadingScenarios(true);

    const { data, error } = await supabase
      .from("pricing_scenarios")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error(error);
      setError("Saved scenarios could not be loaded.");
      setLoadingScenarios(false);
      return;
    }

    setSavedScenarios((data ?? []) as SavedScenario[]);
    setLoadingScenarios(false);
  }, []);

  useEffect(() => {
    loadSavedScenarios();
  }, [loadSavedScenarios]);

  function applyScenario(type: ScenarioType) {
    const values = scenarioDefaults[type];

    setScenarioType(type);
    setCustomerSegment(values.customerSegment);

    setFreeUsers(values.freeUsers);
    setPlusUsers(values.plusUsers);
    setProUsers(values.proUsers);

    setPlusPrice(values.plusPrice);
    setProPrice(values.proPrice);

    setMessage("");
    setError("");
  }

  function safeNumber(value: string) {
    const parsed = Number(value);

    if (!Number.isFinite(parsed) || parsed < 0) {
      return 0;
    }

    return parsed;
  }

  async function saveScenario() {
    setError("");
    setMessage("");

    if (!scenarioName.trim()) {
      setError("Please enter a scenario name before saving.");
      return;
    }

    if (
      freeUsers < 0 ||
      plusUsers < 0 ||
      proUsers < 0 ||
      plusPrice < 0 ||
      proPrice < 0
    ) {
      setError("Users and prices cannot be negative.");
      return;
    }

    if (totalUsers === 0) {
      setError("Add at least one user before saving the scenario.");
      return;
    }

    setSaving(true);

    const { error: saveError } = await supabase
      .from("pricing_scenarios")
      .insert({
        scenario_name: scenarioName.trim(),
        scenario_type: scenarioType,
        customer_segment: customerSegment,

        free_users: freeUsers,
        plus_users: plusUsers,
        pro_users: proUsers,

        plus_price: plusPrice,
        pro_price: proPrice,

        monthly_revenue: Number(monthlyRevenue.toFixed(2)),
        annual_revenue: Number(annualRevenue.toFixed(2)),
      });

    if (saveError) {
      console.error(saveError);
      setError("The pricing scenario could not be saved.");
      setSaving(false);
      return;
    }

    setMessage("Pricing scenario saved successfully.");
    setSaving(false);

    await loadSavedScenarios();
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
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

            <Link href="/product" className="hover:text-purple-700">
              Product
            </Link>

            <Link href="/pricing" className="text-purple-700">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="font-semibold text-purple-700">
          Week 3 — Pricing Simulator
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">
          Pricing & Revenue Simulator
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
          Test product pricing, customer assumptions, and potential monthly
          and annual revenue for Workout Planner.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <p className="font-semibold text-purple-700">
              1. Scenario Toggle
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Select a business scenario
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {(["Conservative", "Growth"] as ScenarioType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => applyScenario(type)}
                  className={`rounded-xl border px-4 py-3 font-bold transition ${
                    scenarioType === type
                      ? "border-purple-700 bg-purple-700 text-white"
                      : "border-zinc-200 bg-white hover:border-purple-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-7">
              <label className="text-sm font-bold">
                Customer Segment
              </label>

              <select
                value={customerSegment}
                onChange={(event) =>
                  setCustomerSegment(
                    event.target.value as CustomerSegment
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-500"
              >
                <option>Students & Young Adults</option>
                <option>Busy Professionals</option>
              </select>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <p className="font-semibold text-purple-700">
              2. Calculator Inputs
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Customer assumptions
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <label>
                <span className="text-sm font-bold">
                  Free Users
                </span>

                <input
                  type="number"
                  min="0"
                  value={freeUsers}
                  onChange={(event) =>
                    setFreeUsers(safeNumber(event.target.value))
                  }
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
                />
              </label>

              <label>
                <span className="text-sm font-bold">
                  Plus Users
                </span>

                <input
                  type="number"
                  min="0"
                  value={plusUsers}
                  onChange={(event) =>
                    setPlusUsers(safeNumber(event.target.value))
                  }
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
                />
              </label>

              <label>
                <span className="text-sm font-bold">
                  Pro Users
                </span>

                <input
                  type="number"
                  min="0"
                  value={proUsers}
                  onChange={(event) =>
                    setProUsers(safeNumber(event.target.value))
                  }
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
                />
              </label>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label>
                <span className="text-sm font-bold">
                  Plus Monthly Price
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={plusPrice}
                  onChange={(event) =>
                    setPlusPrice(safeNumber(event.target.value))
                  }
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
                />
              </label>

              <label>
                <span className="text-sm font-bold">
                  Pro Monthly Price
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={proPrice}
                  onChange={(event) =>
                    setProPrice(safeNumber(event.target.value))
                  }
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <p className="font-semibold text-purple-700">
              3. Assumptions Table
            </p>

            <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-zinc-200">
                    <td className="bg-zinc-50 px-4 py-4 font-bold">
                      Scenario
                    </td>

                    <td className="px-4 py-4 text-right">
                      {scenarioType}
                    </td>
                  </tr>

                  <tr className="border-b border-zinc-200">
                    <td className="bg-zinc-50 px-4 py-4 font-bold">
                      Customer Segment
                    </td>

                    <td className="px-4 py-4 text-right">
                      {customerSegment}
                    </td>
                  </tr>

                  <tr className="border-b border-zinc-200">
                    <td className="bg-zinc-50 px-4 py-4 font-bold">
                      Total Users
                    </td>

                    <td className="px-4 py-4 text-right">
                      {totalUsers}
                    </td>
                  </tr>

                  <tr className="border-b border-zinc-200">
                    <td className="bg-zinc-50 px-4 py-4 font-bold">
                      Paid Users
                    </td>

                    <td className="px-4 py-4 text-right">
                      {paidUsers}
                    </td>
                  </tr>

                  <tr>
                    <td className="bg-zinc-50 px-4 py-4 font-bold">
                      Paid Conversion
                    </td>

                    <td className="px-4 py-4 text-right">
                      {paidConversion.toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-purple-800 to-fuchsia-600 p-8 text-white shadow-lg">
            <p className="font-semibold text-purple-200">
              4. Revenue Calculator
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Estimated Revenue
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-purple-100">
                  Monthly Revenue
                </p>

                <p className="mt-2 text-4xl font-black">
                  {money(monthlyRevenue)}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-purple-100">
                  Annual Revenue
                </p>

                <p className="mt-2 text-4xl font-black">
                  {money(annualRevenue)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-purple-100">
                  Paid Conversion
                </p>

                <p className="mt-2 text-2xl font-black">
                  {paidConversion.toFixed(1)}%
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-purple-100">
                  Revenue per User
                </p>

                <p className="mt-2 text-2xl font-black">
                  {money(averageRevenuePerUser)}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 p-5 text-sm leading-6 text-purple-50">
              Monthly Revenue = Plus Users × Plus Price + Pro Users × Pro
              Price.
              <br />
              Annual Revenue = Monthly Revenue × 12.
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
            <p className="font-semibold text-purple-700">
              5. Save Pricing Scenario
            </p>

            <label className="mt-5 block">
              <span className="text-sm font-bold">
                Scenario Name
              </span>

              <input
                value={scenarioName}
                onChange={(event) =>
                  setScenarioName(event.target.value)
                }
                placeholder="Example: Student Launch Scenario"
                className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-purple-500"
              />
            </label>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {message}
              </div>
            )}

            <button
              onClick={saveScenario}
              disabled={saving}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-500 px-5 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Pricing Scenario"}
            </button>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <p className="font-semibold text-purple-700">
            6. Saved Pricing Scenarios
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Recent saved scenarios
          </h2>

          <p className="mt-2 text-zinc-600">
            Pricing scenarios stored in Supabase are loaded back into the
            dashboard.
          </p>
        </div>

        {loadingScenarios ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-500">
            Loading saved scenarios...
          </div>
        ) : savedScenarios.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-zinc-500">
            No pricing scenarios have been saved yet.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {savedScenarios.map((scenario) => (
              <article
                key={scenario.id}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black">
                      {scenario.scenario_name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {scenario.customer_segment}
                    </p>
                  </div>

                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                    {scenario.scenario_type}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-zinc-50 p-3">
                    <p className="text-zinc-500">Monthly</p>
                    <p className="mt-1 font-black">
                      {money(Number(scenario.monthly_revenue))}
                    </p>
                  </div>

                  <div className="rounded-xl bg-zinc-50 p-3">
                    <p className="text-zinc-500">Annual</p>
                    <p className="mt-1 font-black">
                      {money(Number(scenario.annual_revenue))}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-sm leading-6 text-zinc-600">
                  <p>
                    Free Users:{" "}
                    <strong>{scenario.free_users}</strong>
                  </p>

                  <p>
                    Plus Users:{" "}
                    <strong>{scenario.plus_users}</strong>
                  </p>

                  <p>
                    Pro Users:{" "}
                    <strong>{scenario.pro_users}</strong>
                  </p>
                </div>

                <p className="mt-5 text-xs text-zinc-400">
                  {new Date(scenario.created_at).toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
