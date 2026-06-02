/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function safeFetch<T>(
  query: string,
  params: Record<string, any> = {}
): Promise<T[]> {
  if (projectId === "placeholder") {
    return [] as T[];
  }
  try {
    const result = await client.fetch(query, params);
    return result || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [] as T[];
  }
}

export async function safeFetchSingle<T>(
  query: string,
  params: Record<string, any> = {}
): Promise<T | null> {
  if (projectId === "placeholder") {
    return null;
  }
  try {
    const result = await client.fetch(query, params);
    return result || null;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
