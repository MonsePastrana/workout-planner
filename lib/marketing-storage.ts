import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { marketingAssets, type MarketingAsset } from "./marketing-content";

export type SavedMarketingAsset = {
  id: string;
  user_id: string;
  source_id: string;
  asset_type: MarketingAsset["type"];
  title: string;
  content: string;
  audience: MarketingAsset["audience"];
  channel: string;
  cta: string;
  created_at: string;
};

let client: SupabaseClient | undefined;
let guestRequest: Promise<string> | null = null;

function getClient() {
  if (typeof window === "undefined") {
    throw new Error("Marketing storage is available in the browser only.");
  }

  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      throw new Error("Missing Supabase URL or public key in this environment.");
    }

    client = createClient(url, key, {
      auth: {
        // Keep Marketing separate from the existing modules' sessions.
        storageKey: `workout-marketing-${new URL(url).hostname}-v1`,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }

  return client;
}

async function ensureGuest(): Promise<string> {
  if (!guestRequest) {
    guestRequest = (async () => {
      const db = getClient();
      const { data, error } = await db.auth.getSession();

      if (error) throw error;
      if (data.session) return data.session.user.id;

      // Called only after the user presses Save, never on page load.
      const response = await db.auth.signInAnonymously();

      if (response.error) throw response.error;

      if (!response.data.session) {
        throw new Error("The guest session could not be created.");
      }

      return response.data.session.user.id;
    })();
  }

  try {
    return await guestRequest;
  } finally {
    guestRequest = null;
  }
}

export async function loadMarketingAssets(): Promise<SavedMarketingAsset[]> {
  const db = getClient();
  const { data: auth, error: authError } = await db.auth.getSession();

  if (authError) throw authError;
  if (!auth.session) return [];

  const { data, error } = await db
    .from("marketing_assets")
    .select("*")
    .eq("user_id", auth.session.user.id)
    .order("created_at", { ascending: false })
    .limit(13);

  if (error) throw error;

  return (data ?? []) as SavedMarketingAsset[];
}

export async function saveMarketingAsset(sourceId: string, title: string) {
  const asset = marketingAssets.find((item) => item.id === sourceId);
  const cleanTitle = title.trim();

  if (!asset) {
    throw new Error("Choose an asset from the content library.");
  }

  if (!cleanTitle || cleanTitle.length > 160) {
    throw new Error("Enter a title of 1-160 characters before saving.");
  }

  const userId = await ensureGuest();
  const db = getClient();

  const { data, error } = await db
    .from("marketing_assets")
    .insert({
      source_id: asset.id,
      asset_type: asset.type,
      title: cleanTitle,
      content: asset.content,
      audience: asset.audience,
      channel: asset.channel,
      cta: asset.cta,
      // user_id is supplied by the database default auth.uid().
    })
    .select("*")
    .single();

  if (error?.code === "23505") {
    // A previous save may have succeeded, even if its response was lost.
    const existing = await db
      .from("marketing_assets")
      .select("*")
      .eq("user_id", userId)
      .eq("source_id", sourceId)
      .single();

    if (existing.error) throw existing.error;

    if (!existing.data) {
      throw new Error("Could not retrieve the saved asset.");
    }

    return {
      row: existing.data as SavedMarketingAsset,
      created: false,
    };
  }

  if (error) throw error;

  if (!data) {
    throw new Error("Saving was not confirmed. Refresh before retrying.");
  }

  return {
    row: data as SavedMarketingAsset,
    created: true,
  };
}

export function storageError(error: unknown): string {
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