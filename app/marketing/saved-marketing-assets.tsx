import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatAsset, marketingAssets } from "../../lib/marketing-content";
import {
  loadMarketingAssets,
  saveMarketingAsset,
  storageError,
  type SavedMarketingAsset,
} from "../../lib/marketing-storage";

const field =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3 text-sm focus-visible:outline-2 focus-visible:outline-purple-700";

const button =
  "rounded-xl border border-purple-300 bg-white px-4 py-3 text-sm font-bold text-purple-800 hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-purple-700";

export default function SavedMarketingAssets({
  onExport,
}: {
  onExport: (text: string, filename: string) => void;
}) {
  const [sourceId, setSourceId] = useState(marketingAssets[0].id);
  const [title, setTitle] = useState(marketingAssets[0].title);
  const [saved, setSaved] = useState<SavedMarketingAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const locked = useRef(false);

  const selected = marketingAssets.find(
    (asset) => asset.id === sourceId
  )!;

  const alreadySaved = saved.some(
    (asset) => asset.source_id === sourceId
  );

  useEffect(() => {
    let active = true;

    loadMarketingAssets()
      .then((rows) => {
        if (active) {
          setSaved(rows);
          setReady(true);
        }
      })
      .catch((issue: unknown) => {
        if (active) setError(storageError(issue));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function refresh() {
    if (locked.current || loading) return;

    locked.current = true;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      setSaved(await loadMarketingAssets());
      setReady(true);
      setMessage("Saved list refreshed for this browser session.");
    } catch (issue) {
      setSaved([]);
      setReady(false);
      setError(storageError(issue));
    } finally {
      setLoading(false);
      locked.current = false;
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (locked.current || loading || !ready || alreadySaved) return;

    locked.current = true;
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const result = await saveMarketingAsset(sourceId, title);

      setSaved((current) => [
        result.row,
        ...current.filter(
          (row) =>
            row.user_id === result.row.user_id &&
            row.source_id !== result.row.source_id
        ),
      ]);

      setMessage(
        result.created
          ? "Saved to Supabase. Reload this page to check persistence."
          : "This asset was already saved. No duplicate was created."
      );
    } catch (issue) {
      setError(storageError(issue));
    } finally {
      setSaving(false);
      locked.current = false;
    }
  }

  function exportSaved(row: SavedMarketingAsset) {
    setError("");
    setMessage("");

    try {
      const text = formatAsset({
        id: row.source_id,
        type: row.asset_type,
        title: row.title,
        audience: row.audience,
        channel: row.channel,
        content: row.content,
        cta: row.cta,
      });

      onExport(
        `${text}\n\nSaved at: ${row.created_at}`,
        `saved-${row.source_id.toLowerCase()}.txt`
      );

      setMessage("Download requested. Check your browser downloads.");
    } catch {
      setError(
        "Export failed. Your database record has not been changed."
      );
    }
  }

  return (
    <section
      id="saved-marketing-assets"
      className="mx-auto max-w-7xl px-6 pb-14"
    >
      <h2 className="text-3xl font-black">Save Marketing Content</h2>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
        Choose a prepared post or script and save one copy per guest
        session. Your first save creates a guest account without email
        or password. Saved items are linked to this browser and this
        website address. Another browser, private window, or clearing
        site data will not restore this collection. Do not enter
        personal information.
      </p>

      <form
        noValidate
        onSubmit={save}
        className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6"
      >
        <fieldset disabled={loading || saving}>
          <legend className="font-bold text-purple-800">
            Choose what to save
          </legend>

          <label className="mt-4 block text-sm font-semibold">
            Content

            <select
              value={sourceId}
              className={field}
              onChange={(event) => {
                const asset = marketingAssets.find(
                  (item) => item.id === event.target.value
                );

                if (!asset) return;

                setSourceId(asset.id);
                setTitle(asset.title);
                setError("");
                setMessage("");
              }}
            >
              {marketingAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.id} | {asset.title}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-sm font-semibold">
            Title for your saved copy

            <input
              value={title}
              maxLength={160}
              className={field}
              disabled={alreadySaved}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
                setMessage("");
              }}
            />
          </label>

          <details className="mt-4 rounded-xl bg-purple-50 p-4">
            <summary className="cursor-pointer text-sm font-bold text-purple-800">
              Preview selected content
            </summary>

            <p className="mt-3 whitespace-pre-line break-words text-sm leading-7">
              {selected.content}
            </p>

            <p className="mt-3 text-sm font-bold">
              CTA: {selected.cta}
            </p>
          </details>

          <button
            type="submit"
            disabled={!ready || alreadySaved}
            className={`mt-5 ${button}`}
          >
            {saving
              ? "Saving..."
              : alreadySaved
                ? "Already saved"
                : "Save to Supabase"}
          </button>
        </fieldset>
      </form>

      <p
        role="status"
        aria-atomic="true"
        className="mt-4 text-sm text-purple-800"
      >
        {message}
      </p>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-2xl font-black">
          Saved Marketing Assets
        </h3>

        <button
          type="button"
          disabled={loading || saving}
          onClick={refresh}
          className={button}
        >
          {loading ? "Loading..." : "Refresh saved list"}
        </button>
      </div>

      {loading ? (
        <p role="status" className="mt-5 text-zinc-600">
          Checking this session and loading saved content...
        </p>
      ) : !ready ? (
        <p className="mt-5 text-zinc-600">
          The list could not be loaded. Resolve the error and press
          Refresh saved list.
        </p>
      ) : saved.length === 0 ? (
        <p className="mt-5 rounded-xl border border-dashed border-zinc-300 p-6 text-zinc-600">
          No saved assets in this browser session yet.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {saved.map((row) => (
            <article
              key={row.id}
              className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <p className="text-xs font-bold text-purple-700">
                {row.source_id} | {row.asset_type}
              </p>

              <h4 className="mt-3 break-words text-xl font-bold">
                {row.title}
              </h4>

              <p className="mt-2 text-sm text-zinc-600">
                {row.audience} | {row.channel}
              </p>

              <p className="mt-2 text-xs text-zinc-500">
                Saved:{" "}
                <time dateTime={row.created_at}>
                  {new Date(row.created_at).toLocaleString()}
                </time>
              </p>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-purple-800">
                  View saved content
                </summary>

                <p className="mt-3 whitespace-pre-line break-words text-sm leading-7">
                  {row.content}
                </p>

                <p className="mt-3 text-sm font-bold">
                  CTA: {row.cta}
                </p>
              </details>

              <button
                type="button"
                onClick={() => exportSaved(row)}
                className={`mt-4 ${button}`}
              >
                Export saved .txt
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}