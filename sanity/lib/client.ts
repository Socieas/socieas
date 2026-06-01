import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export interface SanityPost {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: unknown;
  publishedAt: string;
  type: "blog" | "article" | "case-study";
  category?: { title: string; slug: { current: string } };
  author?: { name: string; image?: unknown; bio?: unknown };
  content?: unknown;
  seoTitle?: string;
  seoDescription?: string;
}

export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T[]> {
  if (projectId === "placeholder") {
    return [];
  }
  try {
    return await client.fetch<T[]>(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
}

export async function safeFetchSingle<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (projectId === "placeholder") {
    return null;
  }
  try {
    return await client.fetch<T | null>(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
