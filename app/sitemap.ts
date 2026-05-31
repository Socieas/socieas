import { MetadataRoute } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://socieas.com";
  const posts = await safeFetch<any[]>(allPostsQuery, {}, []);

  const insightRoutes = posts.map((post: any) => {
    const basePath = post.type === "article" ? "/insights/articles" : post.type === "case-study" ? "/insights/case-studies" : "/insights/blogs";
    return {
      url: `${baseUrl}${basePath}/${post.slug.current}`,
      lastModified: post._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/insights/blogs`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/insights/articles`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/insights/case-studies`, lastModified: new Date(), priority: 0.9 },
  ];

  return [...staticRoutes, ...insightRoutes];
}
