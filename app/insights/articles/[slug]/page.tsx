import { notFound } from "next/navigation";
import {
  singlePostQuery,
  allPostsQuery,
} from "@/sanity/lib/queries";

import { safeFetch, safeFetchSingle, SanityPost } from "@/sanity/lib/client";

import InsightPageTemplate from "@/components/insights/InsightPageTemplate";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;

  const post = await safeFetchSingle<SanityPost>(
    singlePostQuery,
    {
      slug,
    }
  );

  if (!post) {
    return {
      title: "Not Found | Socieas",
    };
  }

  return {
    title:
      post.seoTitle || post.title,

    description:
      post.seoDescription ||
      post.excerpt,

    openGraph: {
      title:
        post.seoTitle ||
        post.title,

      description:
        post.seoDescription ||
        post.excerpt,

      type: "article",

      images: [
        `/og?title=${encodeURIComponent(
          post.title
        )}&category=${encodeURIComponent(
          post.category?.title ||
            "Insights"
        )}`,
      ],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;

  const post = await safeFetchSingle<SanityPost>(
    singlePostQuery,
    {
      slug,
    }
  );

  if (!post) {
    notFound();
  }

  const allPosts = await safeFetch<SanityPost>(
    allPostsQuery
  );

  const relatedPosts = allPosts
    .filter(
      (item) =>
        item.slug?.current !==
          slug &&
        item.type ===
          "article"
    )
    .slice(0, 3);

  return (
    <InsightPageTemplate
      post={post}
      relatedPosts={
        relatedPosts
      }
    />
  );
}
