import { SanityPost } from "@/lib/types";

export default function ArticleHero({ post }: { post: SanityPost }) {
  return (
    <section
      style={{
        padding: "130px 24px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "920px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            background: "#F5F3FF",
            color: "#7C3AED",
            padding: "10px 18px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          {post.category?.title || "Insights"}
        </span>

        <h1
          style={{
            fontSize: "clamp(2.5rem,6vw,4.5rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "var(--text)",
            marginTop: "30px",
            marginBottom: "24px",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#6B7280",
            lineHeight: 1.6,
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          {post.excerpt}
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {post.author?.name || "Socieas"}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            >
              Published on{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
