/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import RelatedArticles from "@/components/insights/RelatedArticles";
import CTASection from "@/components/insights/CTASection";
import ArticleHero from "@/components/insights/ArticleHero";
import TableOfContents from "@/components/insights/TableOfContents";

import DOMPurify from "isomorphic-dompurify";

export default function InsightPageTemplate({
  post,
  relatedPosts,
}: any) {

  let cleanHTML =
    DOMPurify.sanitize(
      post.content || ""
    );

  /* EXTRACT HEADINGS */

  const headingRegex =
    /<h2([^>]*)>(.*?)<\/h2>/g;

  const headings: any[] = [];

  cleanHTML = cleanHTML.replace(
    headingRegex,
    (
      match,
      attributes,
      text
    ) => {

      const cleanText =
        text.replace(
          /<[^>]+>/g,
          ""
        );

      const id =
        cleanText
          .toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          );

      headings.push({
        id,
        text: cleanText,
      });

      return `<h2 ${attributes} id="${id}">${text}</h2>`;
    }
  );

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
        style={{
          background:
            "#F7F7F5",

          minHeight:
            "100vh",
        }}
      >
        {/* HERO */}

        <ArticleHero
          post={post}
        />

        {/* CONTENT */}

        <section
          style={{
            padding:
              "0 24px 90px",
          }}
        >
          <div
            style={{
              maxWidth:
                "1180px",

              margin:
                "0 auto",

              display:
                "grid",

              gridTemplateColumns:
                "minmax(0,1fr) 300px",

              gap: "40px",

              alignItems:
                "start",
            }}
          >
            {/* ARTICLE */}

            <article
              style={{
                background:
                  "white",

                borderRadius:
                  "28px",

                padding:
                  "clamp(24px,5vw,60px)",

                border:
                  "1px solid #E5E7EB",

                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.03)",

                overflow:
                  "hidden",
              }}
            >
              <div
                className="socieas-article-content"
                dangerouslySetInnerHTML={{
                  __html:
                    cleanHTML,
                }}
              />
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