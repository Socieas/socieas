import Link from "next/link";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import { SanityPost } from "@/lib/types";

export default function RelatedArticles({
  posts,
}: { posts: SanityPost[] }) {
  return (
    <section
      style={{
        padding: "0 24px 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "34px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",

              fontWeight: 700,

              color: "#111111",
            }}
          >
            Related Insights
          </h2>
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",

            gap: "20px",
          }}
        >
          {posts.map((item) => (
            <Link
              key={item._id}
              href={`/insights/${item.type === 'article' ? 'articles' : item.type === 'case-study' ? 'case-studies' : 'blogs'}/${item.slug.current}`}
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

                  border:
                    "1px solid #E5E7EB",

                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.03)",

                  height: "100%",
                }}
              >
                {item.coverImage && (
                  <div style={{ position: 'relative', width: '100%', height: '190px' }}>
                    <Image
                      src={urlFor(
                        item.coverImage
                      ).url()}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.15rem",

                      lineHeight: 1.4,

                      fontWeight: 700,

                      color: "#111111",

                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: "#6B7280",

                      lineHeight: 1.7,

                      fontSize: "14px",
                    }}
                  >
                    {item.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
