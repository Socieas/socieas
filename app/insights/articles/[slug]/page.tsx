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
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const post = await safeFetchSingle<any>(
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
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const post = await safeFetchSingle<any>(
    singlePostQuery,
    {
      slug,
    }
  );

  const allPosts = await safeFetch<any[]>(
    allPostsQuery,
    {},
    []
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
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Post Not Found</h1>
        <p>The post you are looking for does not exist or has been removed.</p>
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
