export const campaignPlan = [
  "POST-01", "POST-02", "VIDEO-01", "POST-03", "POST-04",
  "POST-05", "VIDEO-02", "POST-06", "POST-07", "POST-08",
  "VIDEO-03", "POST-09", "POST-10", "REVIEW",
] as const;

export type VariantInput = {
  headline: string;
  impressions: string;
  clicks: string;
};

export type Comparison = {
  rateA: number | null;
  rateB: number | null;
  outcome: "A" | "B" | "tie" | "no-data";
  difference: number | null;
};

export type Analysis =
  | { ok: true; result: Comparison }
  | { ok: false; error: string };

// This cap keeps cross-products within exact JavaScript integer precision.
export const MAX_COUNT = 1_000_000;

export function compareHeadlines(
  a: VariantInput,
  b: VariantInput
): Analysis {
  const counts: { impressions: number; clicks: number }[] = [];

  for (const [index, variant] of [a, b].entries()) {
    const label = index === 0 ? "A" : "B";
    const headline = variant.headline.trim();

    if (!headline || headline.length > 160) {
      return {
        ok: false,
        error: `Variant ${label}: enter a headline of 1-160 characters.`,
      };
    }

    const raw = [
      variant.impressions.trim(),
      variant.clicks.trim(),
    ];

    const values = raw.map(Number);

    if (
      raw.some((value) => !/^\d+$/.test(value)) ||
      values.some(
        (value) => !Number.isSafeInteger(value) || value > MAX_COUNT
      )
    ) {
      return {
        ok: false,
        error: `Variant ${label}: use whole numbers from 0 to 1000000. No blanks, negatives, or decimals.`,
      };
    }

    const [impressions, clicks] = values;

    if (clicks > impressions) {
      return {
        ok: false,
        error: `Variant ${label}: clicks cannot exceed impressions.`,
      };
    }

    counts.push({ impressions, clicks });
  }

  const normalize = (text: string) =>
    text.trim().replace(/\s+/g, " ").toLowerCase();

  if (normalize(a.headline) === normalize(b.headline)) {
    return {
      ok: false,
      error: "Use two different headlines for the comparison.",
    };
  }

  const [first, second] = counts;

  const rateA =
    first.impressions === 0
      ? null
      : (first.clicks / first.impressions) * 100;

  const rateB =
    second.impressions === 0
      ? null
      : (second.clicks / second.impressions) * 100;

  if (rateA === null || rateB === null) {
    return {
      ok: true,
      result: {
        rateA,
        rateB,
        outcome: "no-data",
        difference: null,
      },
    };
  }

  const delta =
    first.clicks * second.impressions -
    second.clicks * first.impressions;

  return {
    ok: true,
    result: {
      rateA,
      rateB,
      outcome: delta === 0 ? "tie" : delta > 0 ? "A" : "B",
      difference: Math.abs(rateA - rateB),
    },
  };
}

export function formatRate(rate: number | null): string {
  return rate === null ? "No data" : `${rate.toFixed(2)}%`;
}

export function describeComparison(result: Comparison): string {
  if (result.outcome === "no-data") {
    return "No comparison yet: both variants need at least one impression.";
  }

  if (result.outcome === "tie") {
    return "Tie: both observed click-through rates are equal.";
  }

  const gap =
    (result.difference ?? 0) < 0.01
      ? "less than 0.01"
      : result.difference!.toFixed(2);

  return `Variant ${result.outcome} has the higher observed rate. Gap: ${gap} percentage points. This is not proof of a statistically significant winner.`;
}