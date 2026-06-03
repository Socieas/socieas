import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InsightsPage() {

  const sections = [

    {
      title:
        "Blogs",

      description:
        "SEO-focused educational content, marketing systems, AI workflows, branding psychology, and growth strategies.",

      href:
        "/insights/blogs",
    },

    {
      title:
        "Articles",

      description:
        "Strategic deep-dives, scalable systems thinking, positioning frameworks, and operational intelligence.",

      href:
        "/insights/articles",
    },

    {
      title:
        "Case Studies",

      description:
        "Execution breakdowns, transformation stories, real-world scaling frameworks, and growth systems.",

      href:
        "/insights/case-studies",
    },
  ];

  return (

    <>
      <Navbar />

      <main
        style={{
          background:
            "var(--background)",

          minHeight:
            "100vh",

          padding:
            "140px 24px 100px",
        }}
      >

        {/* HERO */}

        <section
          style={{
            maxWidth:
              "1320px",

            margin:
              "0 auto 90px",
          }}
        >

          <span
            style={{
              background:
                "#7C3AED",

              color:
                "white",

              padding:
                "10px 18px",

              borderRadius:
                "999px",

              fontSize:
                "12px",

              fontWeight:
                700,

              letterSpacing:
                "0.5px",
            }}
          >
            SOCIEAS INSIGHTS
          </span>

          <h1
            style={{
              fontSize:
                "clamp(3.5rem,6vw,7rem)",

              lineHeight:
                0.9,

              fontWeight:
                800,

              color:
                "var(--text)",

              marginTop:
                "28px",

              maxWidth:
                "980px",

              letterSpacing:
                "-0.06em",
            }}
          >
            Ideas,
            systems,
            positioning,
            and scalable
            growth.
          </h1>

          <p
            style={{
              marginTop:
                "30px",

              maxWidth:
                "760px",

              fontSize:
                "1.15rem",

              lineHeight:
                1.9,

              color:
                "#6B7280",
            }}
          >
            Explore strategic insights around branding,
            AI automation, CRM systems, business growth,
            authority building, and scalable digital ecosystems.
          </p>

        </section>

        {/* GRID */}

        <section
          style={{
            maxWidth:
              "1320px",

            margin:
              "0 auto",
          }}
        >

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",

              gap:
                "24px",
            }}
          >

            {sections.map(
              (
                item,
                index
              ) => (

                <Link
                  key={index}
                  href={
                    item.href
                  }
                  style={{
                    textDecoration:
                      "none",

                    color:
                      "inherit",
                  }}
                >

                  <article
                    style={{
                      background:
                        "white",

                      borderRadius:
                        "32px",

                      padding:
                        "38px",

                      border:
                        "1px solid #E5E7EB",

                      minHeight:
                        "320px",

                      display:
                        "flex",

                      flexDirection:
                        "column",

                      justifyContent:
                        "space-between",

                      transition:
                        "0.25s ease",

                      boxShadow:
                        "0 8px 30px rgba(0,0,0,0.04)",
                    }}
                  >

                    <div>

                      <div
                        style={{
                          fontSize:
                            "12px",

                          fontWeight:
                            700,

                          letterSpacing:
                            "0.3em",

                          textTransform:
                            "uppercase",

                          color:
                            "#7C3AED",

                          marginBottom:
                            "22px",
                        }}
                      >
                        Explore
                      </div>

                      <h2
                        style={{
                          fontSize:
                            "2.6rem",

                          lineHeight:
                            1,

                          fontWeight:
                            800,

                          color:
                            "var(--text)",

                          marginBottom:
                            "24px",

                          letterSpacing:
                            "-0.05em",
                        }}
                      >
                        {item.title}
                      </h2>

                      <p
                        style={{
                          color:
                            "#6B7280",

                          lineHeight:
                            1.85,

                          fontSize:
                            "15px",
                        }}
                      >
                        {item.description}
                      </p>

                    </div>

                    <div
                      style={{
                        marginTop:
                          "40px",

                        color:
                          "#7C3AED",

                        fontWeight:
                          700,

                        fontSize:
                          "15px",
                      }}
                    >
                      Explore →
                    </div>

                  </article>

                </Link>
              )
            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}