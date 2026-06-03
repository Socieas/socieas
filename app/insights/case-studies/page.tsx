import InsightsListingTemplate from "@/components/insights/InsightsListingTemplate";

import { safeFetch } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Case Studies",
  description:
    "Real execution stories, measurable business outcomes, implementation frameworks, and transformation results delivered by Socieas.",
  path: "/insights/case-studies",
});

export const revalidate = 60;

type CaseStudySearchParams = {
  search?: string;
  category?: string;
  page?: string;
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: CaseStudySearchParams;
}) {
  const params = searchParams;

  const posts = await safeFetch<any[]>(allPostsQuery, {}, []);

  const caseStudies = posts.filter(
    (post: any) => post.type === "case-study"
  );

  const search = params.search?.toLowerCase() || "";

  const activeCategory = params.category || "All";

  const categories = [
    "All",
    ...caseStudies
      .map((post: any) => post.category?.title)
      .filter(
        (category: string | undefined): category is string => typeof category === "string"
      ),
  ] as string[];

  const filteredCaseStudies = caseStudies.filter((post: any) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(search) ||
      post.excerpt?.toLowerCase().includes(search);

    const matchesCategory =
      activeCategory === "All" || post.category?.title === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const currentPage = Number(params.page || 1);

  const POSTS_PER_PAGE = 9;

  const totalPages = Math.ceil(
    filteredCaseStudies.length / POSTS_PER_PAGE
  );

  const paginatedCaseStudies = filteredCaseStudies.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <InsightsListingTemplate
      title="Case Studies"
      label="SOCIEAS CASE STUDIES"
      description="Execution breakdowns, measurable outcomes, implementation frameworks, and strategic transformation stories from Socieas."
      posts={paginatedCaseStudies}
      categories={categories as string[]}
      activeCategory={activeCategory}
      search={search}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/insights/case-studies"
    />
  );
}
