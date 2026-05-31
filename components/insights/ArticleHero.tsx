/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import { urlFor } from "@/sanity/lib/image";
import calculateReadingTime from "@/lib/calculateReadingTime";
export default function ArticleHero({
  post,
}: any) {
  return (
    <section
      style={{
        padding:
          "120px 24px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Breadcrumbs post={post} />
        {/* CATEGORY */}

        <div
          style={{
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              background: "#7C3AED",

              color: "white",

              padding: "10px 18px",

              borderRadius: "999px",

              fontSize: "12px",

              fontWeight: 700,

              letterSpacing: "0.5px",
            }}
          >
            {post.category?.title ||
              "Insights"}
          </span>
        </div>

        {/* TITLE */}

        <h1
          style={{
            fontSize:
              "clamp(2.3rem,7vw,5rem)",

            lineHeight: 1,

            fontWeight: 700,

            color: "#111111",

            marginBottom: "24px",

            maxWidth: "950px",
          }}
        >
          {post.title}
        </h1>

        {/* EXCERPT */}

        <p
          style={{
            fontSize: "1.1rem",

            lineHeight: 1.9,

            color: "#6B7280",

            maxWidth: "780px",

            marginBottom: "40px",
          }}
        >
          {post.excerpt}
        </p>

        {/* META */}

{/* META */}

<div
  style={{
    display: "flex",

    gap: "18px",

    alignItems: "center",

    marginBottom: "40px",

    flexWrap: "wrap",
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
      color: "#9CA3AF",
    }}
  >
    •
  </span>

  <span
    style={{
      color: "#6B7280",

      fontSize: "14px",
    }}
  >
    {new Date(
      post.publishedAt
    ).toLocaleDateString()}
  </span>

  <span
    style={{
      color: "#9CA3AF",
    }}
  >
    •
  </span>

  <span
    style={{
      color: "#6B7280",

      fontSize: "14px",
    }}
  >
    {calculateReadingTime(
      post.content || ""
    )}
  </span>
</div>

        {/* HERO IMAGE */}

        {post.showHeroBanner &&
          post.heroBanner && (
            <div
              style={{
                position: "relative",

                width: "100%",

                minHeight: "260px",

                maxHeight: "520px",

                borderRadius: "28px",

                overflow: "hidden",

                border:
                  "1px solid #E5E7EB",
              }}
            >
              <Image
                src={urlFor(
                  post.heroBanner
                ).url()}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          )}
      </div>
    </section>
  );
}