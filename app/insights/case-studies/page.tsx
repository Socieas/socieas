import InsightsListingTemplate from "@/components/insights/InsightsListingTemplate";

import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Case Studies",

    description:
      "Explore real business transformations, growth systems, automation frameworks, and execution breakdowns from Socieas.",

    path:
      "/insights/case-studies",
  });

export const revalidate = 60;

export default async function CaseStudiesPage({
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

  const caseStudies =
    posts.filter(
      (post: any) =>
        post.type ===
        "case-study"
    );

  const search =
    params.search
      ?.toLowerCase() ||
    "";

  const activeCategory =
    params.category ||
    "All";

  const categories = [
    "All",

    ...new Set(
      caseStudies
        .map(
          (post: any) =>
            post.category
              ?.title
        )
        .filter(Boolean)
    ),
  ];

  const filteredCaseStudies =
    caseStudies.filter(
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
      filteredCaseStudies.length /
      POSTS_PER_PAGE
    );

  return (
    <InsightsListingTemplate
      title="Case Studies"
      label="SOCIEAS CASE STUDIES"
      description="Execution breakdowns, business transformations, growth systems, positioning strategies, and real-world scaling frameworks from Socieas."
      posts={
        filteredCaseStudies
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
      basePath="/insights/case-studies"
    />
  );
}