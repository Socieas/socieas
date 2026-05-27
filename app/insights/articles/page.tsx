import InsightsListingTemplate from "@/components/insights/InsightsListingTemplate";

import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Strategic Articles",

    description:
      "Deep strategic analysis, positioning frameworks, scalable systems, operational intelligence, and business growth thinking from Socieas.",

    path:
      "/insights/articles",
  });

export const revalidate = 60;

export default async function ArticlesPage({
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

  /* ONLY ARTICLES */

  const articles =
    posts.filter(
      (post: any) =>
        post.type ===
        "article"
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
      articles
        .map(
          (post: any) =>
            post.category
              ?.title
        )
        .filter(Boolean)
    ),
  ];

  /* FILTER ARTICLES */

  const filteredArticles =
    articles.filter(
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
      filteredArticles.length /
      POSTS_PER_PAGE
    );

  const paginatedArticles =
    filteredArticles.slice(

      (
        currentPage - 1
      ) *
        POSTS_PER_PAGE,

      currentPage *
        POSTS_PER_PAGE
    );

  return (

    <InsightsListingTemplate

      title="Strategic Articles"

      label="SOCIEAS ARTICLES"

      description="Deep strategic insights, systems thinking, positioning frameworks, scalable growth systems, and business intelligence from Socieas."

      posts={
        paginatedArticles
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

      basePath="/insights/articles"
    />
  );
}