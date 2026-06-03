import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import RelatedArticles from "@/components/insights/RelatedArticles";
import CTASection from "@/components/insights/CTASection";
import ArticleHero from "@/components/insights/ArticleHero";
import TableOfContents from "@/components/insights/TableOfContents";
import PortableText from "@/components/PortableText";

export default function InsightPageTemplate({
  post,
  relatedPosts,
}: any) {

  /* EXTRACT HEADINGS FOR TOC */
  const headings = (post.content || [])
    .filter((block: any) => block._type === "block" && block.style === "h2")
    .map((block: any) => {
      const text = block.children
        .map((child: any) => child.text)
        .join("");

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return { id, text };
    });

  /* SEO SCHEMA */

  const schema = {
    "@context":
      "https://schema.org",

    "@type":
      post.type ===
      "article"
        ? "Article"
        : post.type ===
            "case-study"
          ? "Article"
          : "BlogPosting",

    headline:
      post.title,

    description:
      post.seoDescription ||
      post.excerpt,

    author: {
      "@type":
        "Person",

      name:
        post.author
          ?.name ||
        "Socieas",
    },

    publisher: {
      "@type":
        "Organization",

      name:
        "Socieas",
    },

    datePublished:
      post.publishedAt,

    mainEntityOfPage: {
      "@type":
        "WebPage",
    },
  };

  return (
    <>
      <Navbar />

      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema
            ),
        }}
      />

      <main
        className="min-h-screen bg-[#F7F7F5]"
      >
        {/* HERO */}

        <ArticleHero
          post={post}
        />

        {/* CONTENT */}

        <section
          className="px-6 pb-24"
        >
          <div
            className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]"
          >
            {/* ARTICLE */}

            <article
              className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-12 lg:p-16"
            >
              <PortableText value={post.content} />
            </article>

            {/* TOC */}

            <div
              className="toc-desktop"
            >
              <TableOfContents
                headings={
                  headings
                }
              />
            </div>
          </div>
        </section>

        {/* RELATED */}

        {relatedPosts.length >
          0 && (
          <RelatedArticles
            posts={
              relatedPosts
            }
          />
        )}

        {/* CTA */}

        <CTASection />
      </main>

      <Footer />
    </>
  );
}
