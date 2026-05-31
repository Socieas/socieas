/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({
  post,
}: any) {

  const basePath =
    post.type === "article"
      ? "/insights/articles"
      : post.type ===
          "case-study"
        ? "/insights/case-studies"
        : "/insights/blogs";

  return (
    <Link
      href={`${basePath}/${post.slug.current}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <article
        style={{
          background: "white",

          borderRadius: "20px",

          overflow: "hidden",

          border: "1px solid #E5E7EB",

          transition: "0.25s ease",

          height: "100%",

          cursor: "pointer",

          boxShadow:
            "0 2px 8px rgba(0,0,0,0.03)",

          display: "flex",

          flexDirection: "column",
        }}
      >
        {/* IMAGE */}

        {post.coverImage && (
          <div
            style={{
              position: "relative",

              width: "100%",

              height: "170px",
            }}
          >
            <Image
              src={urlFor(
                post.coverImage
              ).url()}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* CONTENT */}

        <div
          style={{
            padding: "20px",

            display: "flex",

            flexDirection: "column",

            flex: 1,
          }}
        >
          {/* CATEGORY */}

          <div
            style={{
              fontSize: "11px",

              fontWeight: 700,

              color: "#7C3AED",

              marginBottom: "14px",

              letterSpacing: "0.5px",

              textTransform: "uppercase",
            }}
          >
            {post.category?.title ||
              "Marketing"}
          </div>

          {/* TITLE */}

          <h3
            style={{
              fontSize: "1.15rem",

              lineHeight: 1.4,

              fontWeight: 700,

              color: "#111111",

              marginBottom: "12px",

              display: "-webkit-box",

              WebkitLineClamp: 2,

              WebkitBoxOrient: "vertical",

              overflow: "hidden",
            }}
          >
            {post.title}
          </h3>

          {/* EXCERPT */}

          <p
            style={{
              color: "#6B7280",

              lineHeight: 1.65,

              marginBottom: "20px",

              fontSize: "14px",

              display: "-webkit-box",

              WebkitLineClamp: 3,

              WebkitBoxOrient: "vertical",

              overflow: "hidden",
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

              paddingTop: "14px",

              borderTop:
                "1px solid #F3F4F6",

              marginTop: "auto",
            }}
          >
            <span
              style={{
                color: "#111111",

                fontWeight: 600,

                fontSize: "13px",
              }}
            >
              {post.author?.name ||
                "Socieas"}
            </span>

            <span
              style={{
                color: "#7C3AED",

                fontWeight: 700,

                fontSize: "13px",
              }}
            >
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}