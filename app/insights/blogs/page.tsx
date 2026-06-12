import InsightsListingTemplate from "@/components/insights/InsightsListingTemplate";

import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({
    title:
      "Strategic Blogs",

    description:
      "Business growth insights, digital systems, strategic frameworks, and execution intelligence from Socieas.",

    path:
      "/insights/blogs",
  });

export const revalidate = 60;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const params =
    await searchParams;

  const posts =
    await client.fetch(
      allPostsQuery
    );

  const blogs =
    posts.filter(
      (post: any) =>
        post.type ===
        "blog"
    );

  const search =
    params.search
      ?.toLowerCase() || "";

  const activeCategory =
    params.category ||
    "All";

  const categories: string[] =
    Array<string>().concat(
      "All",
      blogs
        .map(
          (post: any) =>
            post.category
              ?.title
        )
        .filter(
          (
            category:
              | string
              | undefined
          ): category is string =>
            typeof category ===
            "string"
        )
    );

  const filteredBlogs =
    blogs.filter(
      (post: any) => {
        const matchesSearch =
          post.title
            ?.toLowerCase()
            .includes(
              search
            ) ||

          post.excerpt
            ?.toLowerCase()
            .includes(
              search
            );

        const matchesCategory =
          activeCategory ===
            "All" ||

          post.category
            ?.title ===
            activeCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  const currentPage =
    Number(
      params.page || 1
    );

  const POSTS_PER_PAGE =
    9;

  const totalPages =
    Math.ceil(
      filteredBlogs.length /
        POSTS_PER_PAGE
    );

  const paginatedBlogs =
    filteredBlogs.slice(
      (currentPage - 1) *
        POSTS_PER_PAGE,

      currentPage *
        POSTS_PER_PAGE
    );

  return (
    <InsightsListingTemplate
      title="Strategic Blogs"
      label="SOCIEAS BLOGS"
      description="Strategic business insights, systems thinking, and execution frameworks from Socieas."
      posts={
        paginatedBlogs
      }
      categories={
        categories
      }
      activeCategory={
        activeCategory
      }
      search={search}
      currentPage={
        currentPage
      }
      totalPages={
        totalPages
      }
      basePath="/insights/blogs"
    />
  );
}