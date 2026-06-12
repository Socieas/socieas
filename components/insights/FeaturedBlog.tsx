import Link from "next/link";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

export default function FeaturedBlog({
  post,
}: any) {

  if (!post) return null;

  const basePath =
    post.type === "article"
      ? "/insights/articles"
      : post.type ===
          "case-study"
        ? "/insights/case-studies"
        : "/insights/blogs";

  return (
    <section
      style={{
        padding: "0 24px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
        }}
      >
        <Link
          href={`${basePath}/${post.slug.current}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <article
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",

              background: "white",

              borderRadius: "28px",

              overflow: "hidden",

              border: "1px solid #E5E7EB",

              boxShadow:
                "0 2px 8px rgba(0,0,0,0.03)",

              cursor: "pointer",

              alignItems: "stretch",

              transition:
                "0.25s ease",
            }}
          >
            {/* IMAGE */}

            {post.coverImage && (
              <div
                style={{
                  position: "relative",

                  width: "100%",

                  minHeight: "260px",

                  maxHeight: "460px",
                }}
              >
                <Image
                  src={urlFor(
                    post.coverImage
                  ).url()}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* CONTENT */}

            <div
              style={{
                padding: "36px",

                display: "flex",

                flexDirection: "column",

                justifyContent: "center",
              }}
            >
              {/* LABEL */}

              <span
                style={{
                  color: "#7C3AED",

                  fontWeight: 700,

                  fontSize: "12px",

                  marginBottom: "16px",

                  letterSpacing: "0.4px",

                  textTransform: "uppercase",
                }}
              >
                FEATURED INSIGHT
              </span>

              {/* TITLE */}

              <h2
                style={{
                  fontSize:
                    "clamp(1.8rem,3vw,2.6rem)",

                  lineHeight: 1.1,

                  fontWeight: 700,

                  color: "#111111",

                  marginBottom: "18px",
                }}
              >
                {post.title}
              </h2>

              {/* EXCERPT */}

              <p
                style={{
                  color: "#6B7280",

                  lineHeight: 1.75,

                  fontSize: "15px",

                  marginBottom: "24px",
                }}
              >
                {post.excerpt}
              </p>

              {/* FOOTER */}

              <div
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  marginTop: "auto",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,

                    color: "#111111",

                    fontSize: "14px",
                  }}
                >
                  {post.author?.name ||
                    "Socieas"}
                </span>

                <span
                  style={{
                    color: "#7C3AED",

                    fontWeight: 700,

                    fontSize: "14px",
                  }}
                >
                  Read Article →
                </span>
              </div>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
}