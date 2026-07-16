import { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { resources } from "@/data/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://socieas.com";

  const posts = await client.fetch(allPostsQuery);

  const insightRoutes = posts.map((post: any) => {
    const basePath =
      post.type === "article"
        ? "/insights/articles"
        : post.type === "case-study"
          ? "/insights/case-studies"
          : "/insights/blogs";

    return {
      url: `${baseUrl}${basePath}/${post.slug.current}`,
      lastModified: post._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((r) => ({
    url: `${baseUrl}/resources/${r.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/services`, priority: 0.9 },
    { url: `${baseUrl}/services/personal-branding`, priority: 0.8 },
    { url: `${baseUrl}/services/ai-automation`, priority: 0.8 },
    { url: `${baseUrl}/services/crm-solutions`, priority: 0.8 },
    { url: `${baseUrl}/services/digital-marketing`, priority: 0.8 },
    { url: `${baseUrl}/services/full-stack-development`, priority: 0.8 },
    { url: `${baseUrl}/services/staffing-solutions`, priority: 0.8 },
    { url: `${baseUrl}/resources`, priority: 0.9 },
    { url: `${baseUrl}/tools/linkedin-score`, priority: 0.9 },
    { url: `${baseUrl}/insights/blogs`, priority: 0.9 },
    { url: `${baseUrl}/insights/articles`, priority: 0.9 },
    { url: `${baseUrl}/insights/case-studies`, priority: 0.9 },
    { url: `${baseUrl}/about`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3 },
  ];

  return [...staticRoutes, ...resourceRoutes, ...insightRoutes];
}
