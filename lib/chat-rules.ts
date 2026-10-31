export const goals = [
  "Muscle Gain",
  "Strength",
  "General Fitness",
  "Weight Loss",
] as const;

export const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const days = ["2", "3", "4", "5"] as const;
export const durations = ["30", "45", "60"] as const;

export type Goal = (typeof goals)[number];
export type Level = (typeof levels)[number];
export type DayOption = (typeof days)[number];
export type DurationOption = (typeof durations)[number];

export type Intake = {
  goal: Goal;
  level: Level;
  days: DayOption;
  duration: DurationOption;
};

export type GuidedReply = {
  category: "guidance" | "guardrail" | "fallback";
  title: string;
  message: string;
};

export function buildGuidance(intake: Intake): string {
  const levelMessage =
    intake.level === "Beginner"
      ? "Start with a manageable routine and focus on consistency and exercise technique."
      : intake.level === "Intermediate"
        ? "Use your experience to review the proposed routine and adjust it carefully when needed."
        : "Use the generated routine as a planning framework and review volume and recovery based on your experience.";

  return [
    `Your selected goal is ${intake.goal}.`,
    `You chose ${intake.days} training days per week with ${intake.duration}-minute sessions.`,
    levelMessage,
    "Workout Planner can use these preferences as a starting point in the workout generator.",
  ].join(" ");
}

const guardrailPatterns = [
  {
    keywords: [
      "injury",
      "injured",
      "pain",
      "hurt",
      "hurts",
      "doctor",
      "medical",
      "diagnosis",
      "medication",
      "surgery",
    ],
    title: "Medical or injury question",
    message:
      "Workout Planner cannot diagnose injuries, recommend medical treatment, or decide whether an exercise is safe for a medical condition. Please consult a qualified healthcare professional before training with pain, an injury, or a medical concern.",
  },
  {
    keywords: [
      "starve",
      "starving",
      "stop eating",
      "purge",
      "vomit",
      "eating disorder",
      "extreme diet",
    ],
    title: "Nutrition safety",
    message:
      "Workout Planner cannot help with harmful eating or extreme restriction. For nutrition concerns or disordered eating, please speak with a qualified healthcare or nutrition professional.",
  },
  {
    keywords: [
      "steroids",
      "steroid",
      "testosterone",
      "hormone",
      "sarms",
      "drug",
      "drugs",
    ],
    title: "Medication or performance-enhancing substances",
    message:
      "Workout Planner cannot recommend prescription drugs, hormones, steroids, or other performance-enhancing substances. Please discuss medication and hormone questions with a qualified healthcare professional.",
  },
];


function containsWholePhrase(text: string, phrase: string): boolean {
  const normalize = (value: string) =>
    " " + value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";

  return normalize(text).includes(normalize(phrase));
}

export function answerQuestion(
  question: string,
  intake: Intake
): GuidedReply {
  const text = question.trim().toLowerCase();

  if (!text) {
    return {
      category: "fallback",
      title: "Ask a question",
      message:
        "Enter a question about workout planning before sending.",
    };
  }

  for (const rule of guardrailPatterns) {
    if (rule.keywords.some((keyword) => containsWholePhrase(text, keyword))) {
      return {
        category: "guardrail",
        title: rule.title,
        message: rule.message,
      };
    }
  }

  if (
    text.includes("how many days") ||
    text.includes("days per week") ||
    text.includes("schedule")
  ) {
    return {
      category: "guidance",
      title: "Your selected schedule",
      message: `You selected ${intake.days} days per week. The assistant will keep that preference rather than changing it automatically. You can restart the conversation if your availability changes.`,
    };
  }

  if (
    text.includes("duration") ||
    text.includes("minutes") ||
    text.includes("how long")
  ) {
    return {
      category: "guidance",
      title: "Your selected duration",
      message: `You selected ${intake.duration} minutes per workout. Use that as a planning constraint when you open the workout generator.`,
    };
  }

  if (
    text.includes("goal") ||
    text.includes("muscle") ||
    text.includes("strength") ||
    text.includes("fitness") ||
    text.includes("weight")
  ) {
    return {
      category: "guidance",
      title: "Your selected goal",
      message: `Your current planning goal is ${intake.goal}. Workout Planner will treat it as a preference for organizing a routine, not as a guaranteed fitness outcome.`,
    };
  }

  if (
    text.includes("beginner") ||
    text.includes("intermediate") ||
    text.includes("advanced") ||
    text.includes("experience")
  ) {
    return {
      category: "guidance",
      title: "Your experience level",
      message: `You selected ${intake.level}. The workout generator can use that level as part of its planning logic.`,
    };
  }

  if (
    text.includes("what should i do") ||
    text.includes("recommend") ||
    text.includes("next")
  ) {
    return {
      category: "guidance",
      title: "Suggested next step",
      message:
        "Review your selected preferences, confirm that they are correct, and then open the Workout Generator. The assistant does not replace a trainer or make medical decisions.",
    };
  }

  return {
    category: "fallback",
    title: "Outside this guided assistant",
    message:
      "I can help with your selected workout goal, experience level, schedule, duration, and how to continue to the Workout Generator. I cannot answer open-ended medical or personal coaching questions.",
  };
}