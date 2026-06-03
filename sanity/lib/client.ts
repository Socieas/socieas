import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,

  useCdn: false,
});

/**
 * Helper to safely fetch data from Sanity.
 * If the Project ID is missing or the fetch fails, it returns a fallback value instead of crashing.
 */
export async function safeFetch<T>(query: string, params: any = {}, fallback: T): Promise<T> {
  if (projectId === "placeholder") {
    console.warn("Sanity Project ID is placeholder. Returning fallback data.");
    return fallback;
  }

  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return fallback;
  }
}

export async function safeFetchSingle<T>(query: string, params: any = {}): Promise<T | null> {
  return safeFetch<T | null>(query, params, null as T | null);
}