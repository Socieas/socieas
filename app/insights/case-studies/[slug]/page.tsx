import {
  singlePostQuery,
  allPostsQuery,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
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

  const post = await client.fetch(
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

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(
    singlePostQuery,
    {
      slug,
    }
  );

  const allPosts = await client.fetch(
    allPostsQuery
  );

  const relatedPosts = allPosts
    .filter(
      (item: any) =>
        item.slug?.current !==
          slug &&
        item.type ===
          "case-study"
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
