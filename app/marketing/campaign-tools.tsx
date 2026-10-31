import { useState } from "react";
import {
  audiences,
  marketingAssets,
} from "../../lib/marketing-content";
import {
  campaignPlan,
  compareHeadlines,
  describeComparison,
  formatRate,
  type Comparison,
  type VariantInput,
} from "../../lib/marketing-campaign";

const field =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 text-sm focus-visible:outline-2 focus-visible:outline-purple-700";

const button =
  "rounded-xl border border-purple-300 bg-white px-4 py-3 text-sm font-bold text-purple-800 hover:bg-purple-50 focus-visible:outline-2 focus-visible:outline-purple-700";

type ExportText = (text: string, filename: string) => void;

type TestConfig = {
  id: string;
  audience: string;
  headlines: [string, string];
  demo: [string, string, string, string];
};

const tests: TestConfig[] = [
  {
    id: "AB-01",
    audience: audiences[0],
    headlines: [
      "Workout planning that fits your student schedule.",
      "A simple starting point for your next workout.",
    ],
    demo: ["100", "12", "100", "18"],
  },
  {
    id: "AB-02",
    audience: audiences[1],
    headlines: [
      "Make room for training in your busy week.",
      "Start with a clear workout plan.",
    ],
    demo: ["80", "16", "100", "15"],
  },
];

function HeadlineTest({
  config,
  onExport,
}: {
  config: TestConfig;
  onExport: ExportText;
}) {
  const blank = (): [VariantInput, VariantInput] => [
    {
      headline: config.headlines[0],
      impressions: "",
      clicks: "",
    },
    {
      headline: config.headlines[1],
      impressions: "",
      clicks: "",
    },
  ];

  const [variants, setVariants] =
    useState<[VariantInput, VariantInput]>(blank);

  const [source, setSource] = useState("demo");
  const [evidence, setEvidence] = useState("");
  const [result, setResult] = useState<Comparison | null>(null);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [notice, setNotice] = useState("");

  function clearResult() {
    setResult(null);
    setError("");
    setReport("");
    setNotice("");
  }

  function update(
    index: 0 | 1,
    key: keyof VariantInput,
    value: string
  ) {
    const next: [VariantInput, VariantInput] = [
      { ...variants[0] },
      { ...variants[1] },
    ];

    next[index][key] = value;
    setVariants(next);
    clearResult();
  }

  function changeSource(value: string) {
    setSource(value);

    setVariants([
      { ...variants[0], impressions: "", clicks: "" },
      { ...variants[1], impressions: "", clicks: "" },
    ]);

    setEvidence("");
    clearResult();
  }

  function loadDemo() {
    setSource("demo");

    setVariants([
      {
        headline: config.headlines[0],
        impressions: config.demo[0],
        clicks: config.demo[1],
      },
      {
        headline: config.headlines[1],
        impressions: config.demo[2],
        clicks: config.demo[3],
      },
    ]);

    setEvidence("");
    clearResult();
  }

  function reset() {
    setVariants(blank());
    setSource("demo");
    setEvidence("");
    clearResult();
  }

  function calculate() {
    clearResult();

    const analysis = compareHeadlines(
      variants[0],
      variants[1]
    );

    if (!analysis.ok) {
      setError(analysis.error);
      return;
    }

    if (source === "observed" && !evidence.trim()) {
      setError(
        "Describe the measurement source, dates, method, and limitations before using observed data."
      );
      return;
    }

    setResult(analysis.result);

    setReport(
      [
        `${config.id} | ${config.audience}`,

        source === "demo"
          ? "SIMULATED DATA - software check only."
          : "Manually entered observations - not independently verified.",

        `Calculation time (not campaign date): ${new Date().toISOString()}`,

        ...variants.map(
          (variant, index) =>
            `${index === 0 ? "A" : "B"}: ${variant.headline.trim()}\nImpressions: ${variant.impressions}\nClicks: ${variant.clicks}`
        ),

        `CTR A: ${formatRate(analysis.result.rateA)}`,
        `CTR B: ${formatRate(analysis.result.rateB)}`,

        describeComparison(analysis.result),

        `Method/source notes: ${
          source === "demo"
            ? "Invented example counts."
            : evidence.trim()
        }`,

        "Percentages are rounded for display. No statistical significance test is performed.",
      ].join("\n\n")
    );
  }

  function exportReport() {
    if (!report) return;

    try {
      onExport(report, `${config.id.toLowerCase()}-${source}.txt`);
      setNotice(
        "Download requested. Check your browser downloads."
      );
    } catch {
      setNotice(
        "Export failed. Keep a screenshot of your result."
      );
    }
  }

  return (
    <article className="mt-7 rounded-2xl border border-zinc-200 bg-white p-6">
      <h3 className="text-xl font-bold">
        {config.id} | {config.audience}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-600">
        Compare two headlines with the same supporting text and
        call to action. Define your audience, assignment method,
        and observation period before collecting counts.
      </p>

      <label className="mt-5 block text-sm font-semibold">
        Data source
        <select
          value={source}
          onChange={(event) => changeSource(event.target.value)}
          className={field}
        >
          <option value="demo">
            Simulated data - software check
          </option>

          <option value="observed">
            Observed counts - entered manually
          </option>
        </select>
      </label>

      <p className="mt-2 text-sm text-zinc-600">
        Changing the source clears the counts and previous result.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {([0, 1] as const).map((index) => (
          <fieldset
            key={index}
            className="min-w-0 rounded-xl border border-purple-200 p-4"
          >
            <legend className="px-2 font-bold text-purple-800">
              Variant {index === 0 ? "A" : "B"}
            </legend>

            <label className="block text-sm font-semibold">
              Headline
              <textarea
                rows={3}
                maxLength={160}
                value={variants[index].headline}
                onChange={(event) =>
                  update(index, "headline", event.target.value)
                }
                className={field}
              />
            </label>

            {(["impressions", "clicks"] as const).map((key) => (
              <label
                key={key}
                className="mt-4 block text-sm font-semibold"
              >
                {key === "impressions" ? "Impressions" : "Clicks"}

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  placeholder="0"
                  value={variants[index][key]}
                  onChange={(event) =>
                    update(index, key, event.target.value)
                  }
                  className={field}
                />
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <p className="mt-3 text-sm text-zinc-600">
        Whole numbers from 0 to 1000000. Count at most one CTA click
        per exposure; clicks cannot exceed impressions.
      </p>

      {source === "observed" && (
        <label className="mt-5 block text-sm font-semibold">
          Measurement notes (required; no personal information)
          <textarea
            rows={4}
            maxLength={1500}
            value={evidence}
            className={field}
            placeholder="Dates, audience, assignment method, measurement source, and limitations."
            onChange={(event) => {
              setEvidence(event.target.value);
              clearResult();
            }}
          />
        </label>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={calculate}
          className={button}
        >
          Compare headlines
        </button>

        <button
          type="button"
          onClick={loadDemo}
          className={button}
        >
          Load demo counts
        </button>

        <button
          type="button"
          onClick={reset}
          className={button}
        >
          Reset test
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <div aria-live="polite" aria-atomic="true">
        {result && (
          <div className="mt-5 rounded-xl bg-purple-50 p-5">
            <p className="text-sm font-bold text-purple-800">
              {source === "demo"
                ? "SIMULATED DATA - not a real audience test"
                : "Manually entered observations - not independently verified"}
            </p>

            <p className="mt-3 text-lg font-black">
              CTR A: {formatRate(result.rateA)}
              {" | "}
              CTR B: {formatRate(result.rateB)}
            </p>

            <p className="mt-3 text-sm leading-7">
              {describeComparison(result)}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Displayed rates are rounded. Comparison uses
              unrounded counts.
            </p>
          </div>
        )}
      </div>

      {report && (
        <button
          type="button"
          onClick={exportReport}
          className={`mt-4 ${button}`}
        >
          Export comparison .txt
        </button>
      )}

      <p
        role="status"
        className="mt-3 text-sm text-purple-800"
      >
        {notice}
      </p>
    </article>
  );
}

export default function CampaignTools({
  onExport,
}: {
  onExport: ExportText;
}) {
  return (
    <>
      <section
        id="campaign-calendar"
        className="mx-auto max-w-7xl px-6 pb-14"
      >
        <h2 className="text-3xl font-black">
          14-Day Campaign Calendar
        </h2>

        <p className="mt-3 leading-7 text-zinc-600">
          Proposed schedule: 10 posts, 3 video scripts, and one
          review day. Days are relative; this tool does not
          schedule or publish content.
        </p>

        <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campaignPlan.map((id, index) => {
            const asset = marketingAssets.find(
              (item) => item.id === id
            );

            return (
              <li
                key={id}
                className="rounded-2xl border border-zinc-200 bg-white p-5"
              >
                <p className="text-sm font-bold text-purple-700">
                  DAY {index + 1} | {id}
                </p>

                <h3 className="mt-3 font-bold">
                  {id === "REVIEW"
                    ? "Review and improve"
                    : asset?.title ?? "Missing content reference"}
                </h3>

                <p className="mt-2 text-sm text-purple-800">
                  {id === "REVIEW"
                    ? "Internal review"
                    : asset?.channel}
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {id === "REVIEW"
                    ? "Review both headline comparisons, record limitations, and choose a justified improvement."
                    : asset?.type === "Video Script"
                      ? "Produce a video from the script, review it, then publish manually."
                      : "Review the draft and call to action, then publish manually."}
                </p>

                {asset && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-semibold text-purple-800">
                      View draft
                    </summary>

                    <p className="mt-3 whitespace-pre-line break-words text-sm leading-7">
                      {asset.content}
                    </p>

                    <p className="mt-3 text-sm font-bold">
                      CTA: {asset.cta}
                    </p>
                  </details>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section
        id="headline-tests"
        className="mx-auto max-w-7xl px-6 pb-14"
      >
        <h2 className="text-3xl font-black">
          A/B Headline Comparison
        </h2>

        <p className="mt-3 leading-7 text-zinc-600">
          CTR = clicks / impressions x 100. Enter counts collected
          separately. This calculator does not assign visitors or
          collect live traffic. Inputs are not saved and reset
          when the page reloads.
        </p>

        {tests.map((config) => (
          <HeadlineTest
            key={config.id}
            config={config}
            onExport={onExport}
          />
        ))}
      </section>
    </>
  );
}