import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T[]> {
  if (projectId === "placeholder" || !projectId) {
    console.warn("Sanity Project ID is a placeholder or missing. Returning empty array.");
    return [] as T[];
  }
  try {
    const result = await client.fetch<T[]>(query, params);
    return (Array.isArray(result) ? result : []) as T[];
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [] as T[];
  }
}

export async function safeFetchSingle<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (projectId === "placeholder" || !projectId) {
    console.warn("Sanity Project ID is a placeholder or missing. Returning null.");
    return null;
  }
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
