import { Game, GamesDoc } from "../lib/types";
import { apiFetch } from "./client";

export async function listGames(): Promise<Game[]> {
  const doc = await apiFetch<GamesDoc>("/api/games");
  return doc.games;
}

export async function getGame(id: string): Promise<Game> {
  return await apiFetch<Game>(`/api/games/${encodeURIComponent(id)}`);
}
