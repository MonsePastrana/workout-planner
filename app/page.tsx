"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Goal =
  | "Muscle Gain"
  | "Strength"
  | "General Fitness"
  | "Weight Loss";

type Experience = "Beginner" | "Intermediate" | "Advanced";

type DaysPerWeek = 2 | 3 | 4 | 5;

type Duration = 30 | 45 | 60;

type Exercise = {
  name: string;
  sets: number;
  reps: string;
};

type WorkoutDay = {
  day: number;
  title: string;
  focus: string;
  exercises: Exercise[];
};

type SavedWorkout = {
  id: string;
  fitness_goal: string;
  experience_level: string;
  days_per_week: number;
  workout_duration: number;
  generated_workout: WorkoutDay[];
  created_at: string;
};

const workoutTemplates: Record<
  Goal,
  {
    title: string;
    focus: string;
    exercises: Exercise[];
  }[]
> = {
  "Muscle Gain": [
    {
      title: "Push",
      focus: "Chest, Shoulders, Triceps",
      exercises: [
        { name: "Bench Press", sets: 3, reps: "8–10" },
        { name: "Shoulder Press", sets: 3, reps: "8–10" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10–12" },
        { name: "Lateral Raises", sets: 3, reps: "12–15" },
        { name: "Triceps Extension", sets: 3, reps: "10–12" },
      ],
    },
    {
      title: "Pull",
      focus: "Back, Biceps",
      exercises: [
        { name: "Lat Pulldown", sets: 3, reps: "8–10" },
        { name: "Seated Row", sets: 3, reps: "8–10" },
        { name: "Single Arm Row", sets: 3, reps: "10–12" },
        { name: "Face Pulls", sets: 3, reps: "12–15" },
        { name: "Biceps Curl", sets: 3, reps: "10–12" },
      ],
    },
    {
      title: "Legs",
      focus: "Quads, Hamstrings, Glutes",
      exercises: [
        { name: "Squat", sets: 3, reps: "8–10" },
        { name: "Romanian Deadlift", sets: 3, reps: "8–10" },
        { name: "Leg Press", sets: 3, reps: "10–12" },
        { name: "Leg Curl", sets: 3, reps: "10–12" },
        { name: "Calf Raises", sets: 3, reps: "12–15" },
      ],
    },
    {
      title: "Upper Body",
      focus: "Chest, Back, Shoulders, Arms",
      exercises: [
        { name: "Dumbbell Bench Press", sets: 3, reps: "8–10" },
        { name: "Lat Pulldown", sets: 3, reps: "8–10" },
        { name: "Shoulder Press", sets: 3, reps: "10–12" },
        { name: "Biceps Curl", sets: 3, reps: "10–12" },
        { name: "Triceps Pushdown", sets: 3, reps: "10–12" },
      ],
    },
    {
      title: "Lower Body",
      focus: "Legs and Glutes",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "10–12" },
        { name: "Romanian Deadlift", sets: 3, reps: "10–12" },
        { name: "Walking Lunges", sets: 3, reps: "10 each leg" },
        { name: "Leg Curl", sets: 3, reps: "10–12" },
        { name: "Calf Raises", sets: 3, reps: "12–15" },
      ],
    },
  ],

  Strength: [
    {
      title: "Upper Strength",
      focus: "Chest, Back, Shoulders",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "4–6" },
        { name: "Barbell Row", sets: 4, reps: "4–6" },
        { name: "Overhead Press", sets: 3, reps: "5–6" },
        { name: "Lat Pulldown", sets: 3, reps: "6–8" },
        { name: "Close-Grip Bench Press", sets: 3, reps: "6–8" },
      ],
    },
    {
      title: "Lower Strength",
      focus: "Quads, Hamstrings, Glutes",
      exercises: [
        { name: "Back Squat", sets: 4, reps: "4–6" },
        { name: "Romanian Deadlift", sets: 4, reps: "5–6" },
        { name: "Leg Press", sets: 3, reps: "6–8" },
        { name: "Split Squat", sets: 3, reps: "8 each leg" },
        { name: "Calf Raises", sets: 3, reps: "10–12" },
      ],
    },
    {
      title: "Push Strength",
      focus: "Chest, Shoulders, Triceps",
      exercises: [
        { name: "Bench Press", sets: 4, reps: "4–6" },
        { name: "Overhead Press", sets: 4, reps: "4–6" },
        { name: "Incline Press", sets: 3, reps: "6–8" },
        { name: "Dips", sets: 3, reps: "6–8" },
        { name: "Triceps Extension", sets: 3, reps: "8–10" },
      ],
    },
    {
      title: "Pull Strength",
      focus: "Back, Biceps",
      exercises: [
        { name: "Barbell Row", sets: 4, reps: "4–6" },
        { name: "Lat Pulldown", sets: 4, reps: "6–8" },
        { name: "Seated Row", sets: 3, reps: "6–8" },
        { name: "Face Pulls", sets: 3, reps: "10–12" },
        { name: "Biceps Curl", sets: 3, reps: "8–10" },
      ],
    },
    {
      title: "Full Body Strength",
      focus: "Total Body",
      exercises: [
        { name: "Squat", sets: 4, reps: "4–6" },
        { name: "Bench Press", sets: 4, reps: "4–6" },
        { name: "Barbell Row", sets: 4, reps: "4–6" },
        { name: "Overhead Press", sets: 3, reps: "5–6" },
        { name: "Romanian Deadlift", sets: 3, reps: "6–8" },
      ],
    },
  ],

  "General Fitness": [
    {
      title: "Full Body",
      focus: "Total Body",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "10–12" },
        { name: "Push-Ups", sets: 3, reps: "8–12" },
        { name: "Seated Row", sets: 3, reps: "10–12" },
        { name: "Walking Lunges", sets: 3, reps: "10 each leg" },
        { name: "Plank", sets: 3, reps: "30–45 sec" },
      ],
    },
    {
      title: "Full Body",
      focus: "Strength and Conditioning",
      exercises: [
        { name: "Leg Press", sets: 3, reps: "10–12" },
        { name: "Dumbbell Press", sets: 3, reps: "10–12" },
        { name: "Lat Pulldown", sets: 3, reps: "10–12" },
        { name: "Step-Ups", sets: 3, reps: "10 each leg" },
        { name: "Dead Bug", sets: 3, reps: "10 each side" },
      ],
    },
    {
      title: "Upper Body",
      focus: "Chest, Back, Arms",
      exercises: [
        { name: "Dumbbell Bench Press", sets: 3, reps: "10–12" },
        { name: "Seated Row", sets: 3, reps: "10–12" },
        { name: "Shoulder Press", sets: 3, reps: "10–12" },
        { name: "Biceps Curl", sets: 2, reps: "12–15" },
        { name: "Triceps Pushdown", sets: 2, reps: "12–15" },
      ],
    },
    {
      title: "Lower Body",
      focus: "Legs and Core",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "10–12" },
        { name: "Romanian Deadlift", sets: 3, reps: "10–12" },
        { name: "Walking Lunges", sets: 3, reps: "10 each leg" },
        { name: "Calf Raises", sets: 3, reps: "12–15" },
        { name: "Plank", sets: 3, reps: "30–45 sec" },
      ],
    },
    {
      title: "Conditioning",
      focus: "Cardio and Full Body",
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: "15" },
        { name: "Push-Ups", sets: 3, reps: "10" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec" },
        { name: "Walking Lunges", sets: 3, reps: "12 each leg" },
        { name: "Plank", sets: 3, reps: "45 sec" },
      ],
    },
  ],

  "Weight Loss": [
    {
      title: "Full Body Circuit",
      focus: "Full Body Conditioning",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "12–15" },
        { name: "Push-Ups", sets: 3, reps: "10–15" },
        { name: "Seated Row", sets: 3, reps: "12–15" },
        { name: "Walking Lunges", sets: 3, reps: "12 each leg" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec" },
      ],
    },
    {
      title: "Lower Body Circuit",
      focus: "Legs and Conditioning",
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: "15" },
        { name: "Step-Ups", sets: 3, reps: "12 each leg" },
        { name: "Romanian Deadlift", sets: 3, reps: "12" },
        { name: "Calf Raises", sets: 3, reps: "15" },
        { name: "High Knees", sets: 3, reps: "30 sec" },
      ],
    },
    {
      title: "Upper Body Circuit",
      focus: "Upper Body Conditioning",
      exercises: [
        { name: "Dumbbell Press", sets: 3, reps: "12" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Shoulder Press", sets: 3, reps: "12" },
        { name: "Biceps Curl", sets: 3, reps: "12–15" },
        { name: "Triceps Pushdown", sets: 3, reps: "12–15" },
      ],
    },
    {
      title: "Cardio Strength",
      focus: "Strength and Conditioning",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "12" },
        { name: "Push-Ups", sets: 3, reps: "10–12" },
        { name: "Walking Lunges", sets: 3, reps: "12 each leg" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec" },
        { name: "Plank", sets: 3, reps: "45 sec" },
      ],
    },
    {
      title: "Full Body Conditioning",
      focus: "Total Body",
      exercises: [
        { name: "Leg Press", sets: 3, reps: "12–15" },
        { name: "Dumbbell Press", sets: 3, reps: "12" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Step-Ups", sets: 3, reps: "12 each leg" },
        { name: "Plank", sets: 3, reps: "45 sec" },
      ],
    },
  ],
};

function generateWorkout(
  goal: Goal,
  experience: Experience,
  daysPerWeek: DaysPerWeek,
  duration: Duration
): WorkoutDay[] {
  const exerciseLimit = duration === 30 ? 3 : duration === 45 ? 4 : 5;

  const setAdjustment =
    experience === "Beginner" ? -1 : experience === "Advanced" ? 1 : 0;

  return workoutTemplates[goal]
    .slice(0, daysPerWeek)
    .map((day, index) => ({
      day: index + 1,
      title: day.title,
      focus: day.focus,
      exercises: day.exercises.slice(0, exerciseLimit).map((exercise) => ({
        ...exercise,
        sets: Math.max(2, exercise.sets + setAdjustment),
      })),
    }));
}

export default function CorePage() {
  const [goal, setGoal] = useState<Goal>("Muscle Gain");
  const [experience, setExperience] = useState<Experience>("Beginner");
  const [daysPerWeek, setDaysPerWeek] = useState<DaysPerWeek>(3);
  const [duration, setDuration] = useState<Duration>(45);

  const [generated, setGenerated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  const workout = useMemo(
    () => generateWorkout(goal, experience, daysPerWeek, duration),
    [goal, experience, daysPerWeek, duration]
  );

  async function loadSavedWorkouts() {
    setLoadingSaved(true);

    const { data, error } = await supabase
      .from("core_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error(error);
      setLoadingSaved(false);
      return;
    }

    setSavedWorkouts((data ?? []) as SavedWorkout[]);
    setLoadingSaved(false);
  }

  useEffect(() => {
    void loadSavedWorkouts();
  }, []);

  function handleGenerateWorkout() {
    setGenerated(true);
    setSaveMessage("");
  }

  async function handleSaveWorkout() {
    if (!generated) return;

    setSaving(true);
    setSaveMessage("");

    const { error } = await supabase.from("core_outputs").insert({
      fitness_goal: goal,
      experience_level: experience,
      days_per_week: daysPerWeek,
      workout_duration: duration,
      generated_workout: workout,
    });

    if (error) {
      console.error(error);
      setSaveMessage("There was a problem saving your workout.");
      setSaving(false);
      return;
    }

    setSaveMessage("Workout saved successfully.");
    setSaving(false);

    await loadSavedWorkouts();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/">
            <Image
              src="/workout-planner-logo.png"
              alt="Workout Planner"
              width={180}
              height={70}
              priority
              className="h-auto w-36 md:w-44"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-zinc-700 md:flex">
            <Link href="/" className="hover:text-purple-600">
              Home
            </Link>

            <Link
              href="/core"
              className="border-b-2 border-purple-600 pb-2 font-semibold"
            >
              Core
            </Link>

            <Link href="/#product" className="hover:text-purple-600">
              Product
            </Link>

            <Link href="/#roadmap" className="hover:text-purple-600">
              Roadmap
            </Link>

            <Link href="/docs" className="hover:text-purple-600">
              Docs
            </Link>
          </nav>

          <Link
            href="/"
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold hover:border-purple-600 hover:text-purple-600"
          >
            Back Home
          </Link>
        </div>
      </header>

      {/* PAGE */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="mb-8">
          <p className="font-bold text-purple-600">/core</p>

          <h1 className="mt-2 text-3xl font-black md:text-5xl">
            Build a workout that fits your life.
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-zinc-600">
            Enter your preferences and let Workout Planner create a structured
            workout plan based on your fitness goal, experience level, weekly
            schedule, and available time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
          {/* PREFERENCES */}
          <section className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="mb-6 font-bold text-purple-600">
              1. Your Preferences
            </h2>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Fitness Goal
                </span>

                <select
                  value={goal}
                  onChange={(event) =>
                    setGoal(event.target.value as Goal)
                  }
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-600"
                >
                  <option>Muscle Gain</option>
                  <option>Strength</option>
                  <option>General Fitness</option>
                  <option>Weight Loss</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Experience Level
                </span>

                <select
                  value={experience}
                  onChange={(event) =>
                    setExperience(event.target.value as Experience)
                  }
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-600"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Days per Week
                </span>

                <select
                  value={daysPerWeek}
                  onChange={(event) =>
                    setDaysPerWeek(
                      Number(event.target.value) as DaysPerWeek
                    )
                  }
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-600"
                >
                  <option value={2}>2 days</option>
                  <option value={3}>3 days</option>
                  <option value={4}>4 days</option>
                  <option value={5}>5 days</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Workout Duration
                </span>

                <select
                  value={duration}
                  onChange={(event) =>
                    setDuration(Number(event.target.value) as Duration)
                  }
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-purple-600"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </label>

              <button
                type="button"
                onClick={handleGenerateWorkout}
                className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 px-5 py-3 font-bold text-white shadow-sm transition hover:brightness-110"
              >
                Generate Workout
              </button>

              <p className="text-center text-xs text-zinc-500">
                It only takes a few seconds.
              </p>
            </div>
          </section>

          {/* GENERATED WORKOUT */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-purple-600">
                  2. Your Generated Workout
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {goal} · {experience} · {daysPerWeek} days per week
                </p>
              </div>

              <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                {daysPerWeek} days · {duration} min
              </span>
            </div>

            {!generated ? (
              <div className="flex min-h-[450px] items-center justify-center text-center">
                <div>
                  <div className="text-6xl">🏋️</div>

                  <h3 className="mt-5 text-xl font-bold">
                    Your workout will appear here
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                    Choose your preferences and press Generate Workout.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-5">
                {workout.map((day) => (
                  <article
                    key={day.day}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <h3 className="font-bold text-purple-700">
                      Day {day.day} — {day.title}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      {day.focus}
                    </p>

                    <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-white">
                      <div className="grid grid-cols-[1fr_65px_90px] bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-600">
                        <span>Exercise</span>
                        <span className="text-center">Sets</span>
                        <span className="text-center">Reps</span>
                      </div>

                      {day.exercises.map((exercise) => (
                        <div
                          key={exercise.name}
                          className="grid grid-cols-[1fr_65px_90px] border-t border-zinc-200 px-3 py-3 text-sm"
                        >
                          <span>{exercise.name}</span>
                          <span className="text-center">
                            {exercise.sets}
                          </span>
                          <span className="text-center">
                            {exercise.reps}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}

                <button
                  type="button"
                  onClick={handleSaveWorkout}
                  disabled={saving}
                  className="w-full rounded-xl bg-purple-600 px-5 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Workout"}
                </button>

                {saveMessage && (
                  <p
                    className={`text-center text-sm font-semibold ${
                      saveMessage === "Workout saved successfully."
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {saveMessage}
                  </p>
                )}
              </div>
            )}
          </section>
        </div>

        {/* SAVED WORKOUTS */}
        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-purple-600">
            3. Saved Workouts
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Recent workouts saved to Supabase.
          </p>

          <div className="mt-5">
            {loadingSaved ? (
              <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
                Loading saved workouts...
              </div>
            ) : savedWorkouts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
                No saved workouts yet.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {savedWorkouts.map((savedWorkout) => (
                  <article
                    key={savedWorkout.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold">
                          {savedWorkout.fitness_goal}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          {savedWorkout.experience_level}
                        </p>
                      </div>

                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
                        {savedWorkout.days_per_week} days
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-zinc-600">
                      <p>
                        Duration: {savedWorkout.workout_duration} minutes
                      </p>

                      <p>
                        Training days:{" "}
                        {savedWorkout.generated_workout?.length ?? 0}
                      </p>

                      <p className="text-xs text-zinc-400">
                        Saved{" "}
                        {new Date(
                          savedWorkout.created_at
                        ).toLocaleString("en-US")}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}