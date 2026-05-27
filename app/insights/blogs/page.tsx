import InsightsListingTemplate from "@/components/insights/InsightsListingTemplate";

import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Blogs & Insights",

    description:
      "Explore branding psychology, SEO systems, AI automation, CRM growth frameworks, and strategic business insights from Socieas.",

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

  /* ONLY BLOGS */

  const blogs =
    posts.filter(
      (post: any) =>
        post.type ===
        "blog"
    );

  /* SEARCH */

  const search =
    params.search
      ?.toLowerCase() ||
    "";

  /* CATEGORY */

  const activeCategory =
    params.category ||
    "All";

  /* DYNAMIC CATEGORIES */

  const categories = [

    "All",

    ...new Set(
      blogs
        .map(
          (post: any) =>
            post.category
              ?.title
        )
        .filter(Boolean)
    ),
  ];

  /* FILTER BLOGS */

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

  /* PAGINATION */

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

      (
        currentPage - 1
      ) *
        POSTS_PER_PAGE,

      currentPage *
        POSTS_PER_PAGE
    );

  return (

    <InsightsListingTemplate

      title="Blogs & Insights"

      label="SOCIEAS INSIGHTS"

      description="Strategic insights, marketing systems, AI automation, branding psychology, CRM growth frameworks, and business scaling content from Socieas."

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