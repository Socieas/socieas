import JsonLd from "@/components/seo/JsonLd";
import { articleSchema } from "@/lib/schema/article";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { singlePostQuery, allPostsQuery } from "@/sanity/lib/queries";

import { client } from "@/sanity/lib/client";

import InsightPageTemplate from "@/components/insights/InsightPageTemplate";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(singlePostQuery, { slug });

  if (!post) {
    return {
      title: "Not Found | Socieas",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      images: [
        `/og?title=${encodeURIComponent(
          post.title
        )}&category=${encodeURIComponent(post.category?.title || "Insights")}`,
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(singlePostQuery, { slug });

  const allPosts = await client.fetch(allPostsQuery);

  const relatedPosts = allPosts
    .filter(
      (item: any) => item.slug?.current !== slug && item.type === "blog"
    )
    .slice(0, 3);

  if (!post) {
    return (
      <div className="py-32 text-center text-lg text-slate-600">
        Not found
      </div>
    );
  }

  return (
    <>
      <JsonLd
        schema={[
          articleSchema({
            headline: post.title,
            description: post.seoDescription || post.excerpt || "",
            url: `https://socieas.com/insights/blogs/${slug}`,
            datePublished: post.publishedAt || undefined,
            dateModified: post._updatedAt || undefined,
            authorName: post.author?.name || undefined,
            imageUrl: post.mainImage?.asset?.url || undefined,
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Insights", url: "https://socieas.com/insights" },
            { name: "Blogs", url: "https://socieas.com/insights/blogs" },
            {
              name: post.title,
              url: `https://socieas.com/insights/blogs/${slug}`,
            },
          ]),
        ]}
        id="blog-post-schema"
      />
      <InsightPageTemplate post={post} relatedPosts={relatedPosts} />
    </>
  );
}
