/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  singlePostQuery,
  allPostsQuery,
} from "@/sanity/lib/queries";

import { safeFetch, safeFetchSingle } from "@/sanity/lib/client";

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

  const post: any = await safeFetchSingle(
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

  const post: any = await safeFetchSingle(
    singlePostQuery,
    {
      slug,
    }
  );

  const allPosts: any = await safeFetch(
    allPostsQuery
  );

  const relatedPosts = allPosts
    .filter(
      (item: any) =>
        item.slug?.current !==
          slug &&
        item.type ===
          "article"
    )
    .slice(0, 3);

  if (!post) {
    return (
      <div
        style={{
          padding: "120px 24px",
        }}
      >
        Not found
      </div>
    );
  }

  return (
    <InsightPageTemplate
      post={post}
      relatedPosts={
        relatedPosts
      }
    />
  );
}