import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Intake } from "./chat-rules";

export type Rating = "up" | "down";
export type TesterLabel =
  | "Self test"
  | "External tester 1"
  | "External tester 2"
  | "External tester 3";
export type ResponseCategory =
  | "initial"
  | "guidance"
  | "guardrail"
  | "fallback";

export type ChatTestRecord = {
  id: string;
  run_id: string;
  tester_label: TesterLabel;
  goal: Intake["goal"];
  level: Intake["level"];
  days_per_week: number;
  duration_minutes: number;
  response_category: ResponseCategory;
  rating: Rating;
  created_at: string;
};

const columns =
  "id,run_id,tester_label,goal,level,days_per_week,duration_minutes,response_category,rating,created_at";

let client: SupabaseClient | undefined;
let signInRequest: Promise<string> | null = null;

function database(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("Chat test storage works in the browser only.");
  }

  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publicKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publicKey) {
      throw new Error("Supabase public environment variables are missing.");
    }

    client = createClient(url, publicKey, {
      auth: {
        storageKey: `workout-chat-${new URL(url).hostname}-v1`,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }

  return client;
}

async function ensureGuest(): Promise<string> {
  if (!signInRequest) {
    signInRequest = (async () => {
      const db = database();
      const { data, error } = await db.auth.getSession();
      if (error) throw error;
      if (data.session) return data.session.user.id;

      // No guest account is created before the visitor presses Save.
      const result = await db.auth.signInAnonymously();
      if (result.error) throw result.error;
      if (!result.data.session) {
        throw new Error("Could not create a guest session.");
      }
      return result.data.session.user.id;
    })();
  }

  try {
    return await signInRequest;
  } finally {
    signInRequest = null;
  }
}

export async function loadChatTests(): Promise<ChatTestRecord[]> {
  const db = database();
  const { data: auth, error: authError } = await db.auth.getSession();
  if (authError) throw authError;
  if (!auth.session) return [];

  const { data, error } = await db
    .from("chat_test_sessions")
    .select(columns)
    .eq("user_id", auth.session.user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return (data ?? []) as ChatTestRecord[];
}

export async function saveChatTest(input: {
  runId: string;
  testerLabel: TesterLabel;
  intake: Intake;
  responseCategory: ResponseCategory;
  rating: Rating;
}): Promise<{ record: ChatTestRecord; created: boolean }> {
  const db = database();
  const userId = await ensureGuest();

  const { data, error } = await db
    .from("chat_test_sessions")
    .insert({
      run_id: input.runId,
      tester_label: input.testerLabel,
      goal: input.intake.goal,
      level: input.intake.level,
      days_per_week: Number(input.intake.days),
      duration_minutes: Number(input.intake.duration),
      response_category: input.responseCategory,
      rating: input.rating,
      // user_id defaults to auth.uid() in PostgreSQL.
    })
    .select(columns)
    .single();

  if (error?.code === "23505") {
    // A previous request may have reached the DB but lost its response.
    const previous = await db
      .from("chat_test_sessions")
      .select(columns)
      .eq("user_id", userId)
      .eq("run_id", input.runId)
      .single();
    if (previous.error) throw previous.error;
    if (!previous.data) throw new Error("Saved test could not be retrieved.");
    return { record: previous.data as ChatTestRecord, created: false };
  }

  if (error) throw error;
  if (!data) throw new Error("Save was not confirmed; reload before retrying.");
  return { record: data as ChatTestRecord, created: true };
}

export function chatStorageError(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return "The operation failed. Check your connection and try again.";
}
