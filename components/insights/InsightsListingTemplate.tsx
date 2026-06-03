import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/insights/CTASection";
import BlogCard from "@/components/insights/BlogCard";
import FeaturedBlog from "@/components/insights/FeaturedBlog";
import SearchBar from "@/components/insights/SearchBar";
import { SanityPost } from "@/lib/types";

type InsightsListingTemplateProps = {
  title: string;
  label: string;
  description: string;
  posts: SanityPost[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  categories: string[];
  activeCategory: string;
  search: string;
};

export default function InsightsListingTemplate({
  title,
  label,
  description,
  posts,
  currentPage,
  totalPages,
  basePath,
  categories,
  activeCategory,
  search,
}: InsightsListingTemplateProps) {
  const featuredPost = currentPage === 1 ? posts[0] : null;
  const remainingPosts = currentPage === 1 ? posts.slice(1) : posts;

  const createCategoryUrl = (category: string) => {
    const params = new URLSearchParams();

    if (category !== "All") params.set("category", category);
    if (search) params.set("search", search);

    return `${basePath}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (activeCategory !== "All") params.set("category", activeCategory);
    if (search) params.set("search", search);
    params.set("page", String(page));

    return `${basePath}?${params.toString()}`;
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "var(--background)",
          minHeight: "100vh",
        }}
      >
        <section
          style={{
            padding: "120px 24px 50px",
          }}
        >
          <div
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
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
              {label}
            </span>

            <h1
              style={{
                fontSize: "clamp(2.5rem,7vw,5rem)",
                lineHeight: 0.95,
                fontWeight: 700,
                color: "var(--text)",
                marginTop: "26px",
                marginBottom: "20px",
                maxWidth: "850px",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#6B7280",
                lineHeight: 1.8,
                maxWidth: "720px",
                marginBottom: "38px",
              }}
            >
              {description}
            </p>

            <div
              style={{
                marginBottom: "28px",
              }}
            >
              <SearchBar initialValue={search} />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {categories.map((category) => (
                <Link
                  key={category}
                  href={createCategoryUrl(category)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    background:
                      activeCategory === category ? "#7C3AED" : "white",
                    color:
                      activeCategory === category ? "white" : "var(--text)",
                    border:
                      activeCategory === category
                        ? "1px solid #7C3AED"
                        : "1px solid #E5E7EB",
                  }}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {featuredPost && <FeaturedBlog post={featuredPost} />}

        <section
          style={{
            padding: "0 24px 80px",
          }}
        >
          <div
            style={{
              maxWidth: "1180px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "28px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                Recent Insights
              </h2>

              <span
                style={{
                  color: "#6B7280",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                {remainingPosts.length} Articles
              </span>
            </div>

            {remainingPosts.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                  gap: "20px",
                }}
              >
                {remainingPosts.map((post: SanityPost) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "white",
                  borderRadius: "28px",
                  padding: "60px 20px",
                  textAlign: "center",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h3
                  style={{
                    fontSize: "2rem",
                    color: "var(--text)",
                    marginBottom: "14px",
                  }}
                >
                  No Insights Found
                </h3>

                <p
                  style={{
                    color: "#6B7280",
                    maxWidth: "520px",
                    margin: "0 auto",
                    lineHeight: 1.8,
                  }}
                >
                  No articles matched your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              paddingBottom: "90px",
              flexWrap: "wrap",
            }}
          >
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <Link
                  key={page}
                  href={createPageUrl(page)}
                  style={{
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "14px",
                    textDecoration: "none",
                    fontWeight: 700,
                    background:
                      currentPage === page ? "#7C3AED" : "white",
                    color:
                      currentPage === page ? "white" : "var(--text)",
                    border:
                      currentPage === page
                        ? "1px solid #7C3AED"
                        : "1px solid #E5E7EB",
                  }}
                >
                  {page}
                </Link>
              );
            })}
          </div>
        )}

        <CTASection />
      </main>

      <Footer />
    </>
  );
}
