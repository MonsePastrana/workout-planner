export const audiences = [
  "Students & Young Adults",
  "Busy Professionals",
] as const;

export type MarketingAsset = {
  id: string;
  type: "Social Post" | "Video Script";
  audience: (typeof audiences)[number];
  channel: string;
  title: string;
  content: string;
  cta: string;
};

export const generatorUrl =
  "https://workout-planner-lilac-six.vercel.app/core";

// Prepared campaign drafts, not output from a live AI model.
export const marketingAssets: MarketingAsset[] = [
  {
    id: "POST-01",
    type: "Social Post",
    audience: audiences[0],
    channel: "Instagram",
    title: "Between classes and commitments",
    content:
      "Classes, assignments, and a busy week? Start with the time you actually have. Choose your goal, experience level, training days, and workout duration in Workout Planner.\n\n#WorkoutPlanner #StudentLife #WorkoutPlanning",
    cta: "Build a workout proposal around your week.",
  },
  {
    id: "POST-02",
    type: "Social Post",
    audience: audiences[1],
    channel: "LinkedIn",
    title: "Give training a place in your calendar",
    content:
      "Your meetings have a place in your calendar. Your workout planning can, too. Workout Planner helps you organize a routine proposal around your goals and availability.\n\n#WorkoutPlanner #BusyProfessionals #Planning",
    cta: "Choose your available training days.",
  },
  {
    id: "POST-03",
    type: "Social Post",
    audience: audiences[0],
    channel: "Instagram",
    title: "New to workout planning?",
    content:
      "You do not have to start with a blank page. Select Beginner, choose a goal, and review a structured workout proposal. Use it as a planning starting point, not a substitute for professional guidance.\n\n#WorkoutPlanner #BeginnerPlanning #StudentWellbeing",
    cta: "Explore the workout generator.",
  },
  {
    id: "POST-04",
    type: "Social Post",
    audience: audiences[1],
    channel: "Instagram",
    title: "Choose the time you have",
    content:
      "A busy schedule calls for a clear plan. Choose a preferred duration of 30, 45, or 60 minutes and explore a workout proposal based on your selections.\n\n#WorkoutPlanner #TimeManagement #WorkoutPlanning",
    cta: "Set your preferred workout duration.",
  },
  {
    id: "POST-05",
    type: "Social Post",
    audience: audiences[0],
    channel: "Instagram",
    title: "Start with your goal",
    content:
      "What do you want to focus on? Choose Muscle Gain, Strength, General Fitness, or Weight Loss as your planning goal. Then add your experience and availability. These are planning preferences, not promises of results.\n\n#WorkoutPlanner #FitnessGoals #PlanYourWeek",
    cta: "Choose your planning goal.",
  },
  {
    id: "POST-06",
    type: "Social Post",
    audience: audiences[1],
    channel: "LinkedIn",
    title: "A clearer starting point",
    content:
      "Workout planning does not need to begin with a blank document. Enter your preferences in Workout Planner and review the proposed routine before deciding how to use it.\n\n#WorkoutPlanner #WorkLifePlanning #PersonalOrganization",
    cta: "Review your workout proposal.",
  },
  {
    id: "POST-07",
    type: "Social Post",
    audience: audiences[0],
    channel: "Instagram",
    title: "Different weeks, different availability",
    content:
      "An exam week may look different from a regular week. Choose between 2 and 5 training days in the generator to explore a proposal based on your current availability.\n\n#WorkoutPlanner #UniversityLife #FlexiblePlanning",
    cta: "Plan around the week ahead.",
  },
  {
    id: "POST-08",
    type: "Social Post",
    audience: audiences[1],
    channel: "LinkedIn",
    title: "Review before you start",
    content:
      "A generated plan is a starting point, not personal coaching. Review the proposal, consider your needs, and seek qualified guidance when needed. Workout Planner supports organization; it does not assess technique or provide medical advice.\n\n#WorkoutPlanner #ThoughtfulPlanning #FitnessTools",
    cta: "Explore the planner and review its proposal.",
  },
  {
    id: "POST-09",
    type: "Social Post",
    audience: audiences[0],
    channel: "Instagram",
    title: "Four choices to get started",
    content:
      "Goal. Experience. Training days. Duration. Bring those four preferences together in one workout planning tool, then review the result.\n\n#WorkoutPlanner #SimplePlanning #StudentLife",
    cta: "Open the generator and choose your preferences.",
  },
  {
    id: "POST-10",
    type: "Social Post",
    audience: audiences[1],
    channel: "Instagram",
    title: "Plan the week ahead",
    content:
      "Before your calendar fills up, think about your available training time. Use Workout Planner to explore a routine proposal that reflects your goals, experience, and schedule.\n\n#WorkoutPlanner #WeeklyPlanning #BusyProfessionals",
    cta: "Build a proposal for your upcoming week.",
  },
  {
    id: "VIDEO-01",
    type: "Video Script",
    audience: audiences[0],
    channel: "Instagram Reels / TikTok",
    title: "A plan between classes",
    content: `HOOK | 0-4 seconds
Visual: A student looking at a weekly calendar.
Voice: "Busy week? Start with the time you have."

DEMO | 4-20 seconds
Visual: Show the real generator. Choose a goal, Beginner, 3 days, and 30 minutes.
Voice: "Choose your goal, level, training days, and duration. Then review your workout proposal."

CLOSE | 20-30 seconds
Visual: Show the generated proposal and the product name.
Voice: "Build a workout that fits your life. Explore Workout Planner."
On-screen note: "Planning support, not personal coaching."`,
    cta: "Try the workout generator using the profile link.",
  },
  {
    id: "VIDEO-02",
    type: "Video Script",
    audience: audiences[1],
    channel: "Instagram Reels / LinkedIn",
    title: "Your schedule comes first",
    content: `HOOK | 0-4 seconds
Visual: A calendar with work commitments.
Voice: "Your week is busy. Start your workout planning with your availability."

DEMO | 4-20 seconds
Visual: Show the real generator and its training-day and duration controls.
Voice: "Choose your preferences and explore a structured routine proposal."

CLOSE | 20-30 seconds
Visual: Show the proposal, then the Workout Planner homepage.
Voice: "Review your plan before you begin. Workout Planner helps you organize the starting point."
On-screen note: "No guaranteed outcomes. Review your individual needs."`,
    cta: "Open Workout Planner and set your availability.",
  },
  {
    id: "VIDEO-03",
    type: "Video Script",
    audience: audiences[0],
    channel: "Instagram Reels / TikTok",
    title: "From preferences to proposal",
    content: `HOOK | 0-4 seconds
Visual: Four labels: Goal, Level, Days, Duration.
Voice: "Not sure where to start? Begin with four choices."

DEMO | 4-20 seconds
Visual: Record the real generator as each field is completed.
Voice: "Choose a goal, your experience, and the time available in your week. Review the proposal the tool creates."

CLOSE | 20-30 seconds
Visual: Product name and a link to the generator.
Voice: "Simple planning, your schedule. Explore Workout Planner."
On-screen note: "Not a substitute for a qualified trainer."`,
    cta: "Build your first workout proposal.",
  },
];

export function formatAsset(asset: MarketingAsset): string {
  return [
    `Workout Planner | ${asset.id}`,
    `${asset.type}: ${asset.title}`,
    `Audience: ${asset.audience}`,
    `Channel: ${asset.channel}`,
    "",
    asset.content,
    "",
    `Call to action: ${asset.cta}`,
    generatorUrl,
  ].join("\n");
}

export function filterAssets(
  audience: string,
  type: string,
  query: string
) {
  const search = query.trim().toLowerCase();

  return marketingAssets.filter(
    (asset) =>
      (audience === "All" || asset.audience === audience) &&
      (type === "All" || asset.type === type) &&
      `${asset.id} ${asset.title} ${asset.channel} ${asset.content} ${asset.cta}`
        .toLowerCase()
        .includes(search)
  );
}