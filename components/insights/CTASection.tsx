import Link from "next/link";

export default function CTASection() {
  return (
    <section
      style={{
        padding: "0 24px 70px",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#7C3AED 0%,#6D28D9 100%)",

            borderRadius: "28px",

            padding: "42px 34px",

            textAlign: "center",

            boxShadow:
              "0 10px 40px rgba(124,58,237,0.12)",
          }}
        >
          <h2
            style={{
              fontSize:
                "clamp(1.8rem,3vw,2.6rem)",

              lineHeight: 1.1,

              fontWeight: 700,

              color: "white",

              marginBottom: "14px",
            }}
          >
            Want To Scale Your Brand
            Strategically?
          </h2>

          <p
            style={{
              maxWidth: "620px",

              margin:
                "0 auto 24px",

              color: "#E9D5FF",

              fontSize: "15px",

              lineHeight: 1.7,
            }}
          >
            Explore how Socieas helps
            businesses grow through AI
            automation, CRM systems,
            positioning strategy, and
            conversion-focused digital
            ecosystems.
          </p>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",

              alignItems: "center",

              justifyContent:
                "center",

              background: "white",

              color: "#7C3AED",

              padding: "14px 24px",

              borderRadius: "999px",

              textDecoration:
                "none",

              fontWeight: 700,

              fontSize: "14px",

              boxShadow:
                "0 10px 30px rgba(255,255,255,0.15)",
            }}
          >
            Book Strategy Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}