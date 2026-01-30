import { useEffect, useMemo, useState } from "react";
import type { GamesDoc } from "./types";
import { GAMES_URL } from "./data"; // TODO: legacy JSON source (keep commented for now)

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

/**
 * Planned endpoint:
 *   GET /games
 * filters: platform, categoryType, availability, q, limit, cursor
 */
function buildGamesUrl(params?: {
  platform?: string | string[];
  categoryType?: string;
  availability?: string;
  q?: string;
  limit?: number;
  cursor?: string;
}) {
  const url = new URL(`${API_BASE}/games`, window.location.origin);

  if (params?.platform) {
    const platforms = Array.isArray(params.platform)
      ? params.platform
      : [params.platform];

    for (const p of platforms) url.searchParams.append("platform", p);
  }

  if (params?.categoryType)
    url.searchParams.set("categoryType", params.categoryType);
  if (params?.availability)
    url.searchParams.set("availability", params.availability);
  if (params?.q) url.searchParams.set("q", params.q);
  if (typeof params?.limit === "number")
    url.searchParams.set("limit", String(params.limit));
  if (params?.cursor) url.searchParams.set("cursor", params.cursor);

  return url.toString();
}

type UseGamesParams = {
  platform?: string | string[];
  categoryType?: string;
  availability?: string;
  q?: string;
  limit?: number;
  cursor?: string;
};

export function useGames(params?: UseGamesParams) {
  const [doc, setDoc] = useState<GamesDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const url = useMemo(() => buildGamesUrl(params), [params]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError(null);
        setLoading(true);

        // const res = await fetch(url, {
        //   method: "GET",
        //   signal: controller.signal,
        //   headers: { Accept: "application/json" },
        //   cache: "no-store",
        // });

        const res = await fetch(GAMES_URL, { cache: "no-store" });

        if (!res.ok) throw new Error(`Failed to load /games (${res.status})`);

        const json = (await res.json()) as GamesDoc;
        setDoc(json);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") return;

        const message =
          e instanceof Error
            ? e.message
            : typeof e === "string"
              ? e
              : "Unknown error";
        setError(message);
        setDoc(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [url]);

  return { doc, loading, error };
}
