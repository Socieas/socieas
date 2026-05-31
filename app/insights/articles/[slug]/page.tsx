import { singlePostQuery, allPostsQuery } from "@/sanity/lib/queries";
import { safeFetch } from "@/sanity/lib/client";
import InsightPageTemplate from "@/components/insights/InsightPageTemplate";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; }>; }) {
  const { slug } = await params;
  const post = await safeFetch<any>(singlePostQuery, { slug }, null);

  if (!post) {
    return { title: "Not Found | Socieas" };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      images: [`/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category?.title || "Insights")}`],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string; }>; }) {
  const { slug } = await params;
  const post = await safeFetch<any>(singlePostQuery, { slug }, null);
  const allPosts = await safeFetch<any[]>(allPostsQuery, {}, []);

  const relatedPosts = allPosts
    .filter((item: any) => item.slug?.current !== slug && item.type === "article")
    .slice(0, 3);

  if (!post) {
    return <div style={{ padding: "120px 24px" }}>Not found</div>;
  }

  return <InsightPageTemplate post={post} relatedPosts={relatedPosts} />;
}
