import { MetadataRoute } from "next";
import { allPostsQuery } from "@/sanity/lib/queries";
import { safeFetch } from "@/sanity/lib/client";
import { SanityPost } from "@/lib/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://socieas.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/insights",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // Fetch all posts for dynamic routes
  const posts = await safeFetch<SanityPost[]>(allPostsQuery, {}, []);

  const dynamicRoutes = posts.map((post) => {
    const typePath =
      post.type === "article"
        ? "articles"
        : post.type === "case-study"
          ? "case-studies"
          : "blogs";
    return {
      url: `${baseUrl}/insights/${typePath}/${post.slug?.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    };
  });

  return [...staticRoutes, ...dynamicRoutes];
}
