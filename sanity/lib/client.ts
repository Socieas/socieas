import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
import { placeholderPosts } from "@/lib/placeholder-data";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

/**
 * A wrapper for client.fetch that returns placeholder data if the Project ID is 'placeholder'
 * or if the fetch fails.
 */
export async function safeFetch<T>(query: string, params: any = {}): Promise<T[]> {
  if (projectId === "placeholder") {
    console.warn("Using placeholder data because Sanity Project ID is not configured.");
    return placeholderPosts as unknown as T[];
  }

  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Sanity fetch error, falling back to placeholder data:", error);
    return placeholderPosts as unknown as T[];
  }
}

/**
 * A wrapper for client.fetch that returns a single placeholder item or null.
 */
export async function safeFetchSingle<T>(query: string, params: any = {}): Promise<T | null> {
  if (projectId === "placeholder") {
    const slug = params.slug;
    const fallback = placeholderPosts.find(p => p.slug.current === slug);
    return (fallback as unknown as T) || null;
  }

  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Sanity fetch error (single), returning null:", error);
    return null;
  }
}
