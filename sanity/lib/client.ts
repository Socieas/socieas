import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, defaultValue: T): Promise<T> {
  if (projectId === "placeholder" || !projectId) {
    console.warn("Sanity project ID is not configured. Returning default value.");
    return defaultValue;
  }
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return defaultValue;
  }
}
