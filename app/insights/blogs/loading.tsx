export default function Loading() {
  return (
    <main
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        padding: "90px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
        }}
      >
        {/* HERO */}

        <div
          style={{
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "38px",
              borderRadius: "999px",
              background: "#E5E7EB",
              marginBottom: "28px",
            }}
          />

          <div
            style={{
              width: "60%",
              height: "72px",
              borderRadius: "12px",
              background: "#E5E7EB",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              width: "80%",
              height: "24px",
              borderRadius: "8px",
              background: "#E5E7EB",
            }}
          />
        </div>

        {/* FEATURED */}

        <div
          style={{
            height: "420px",
            borderRadius: "28px",
            background: "#E5E7EB",
            marginBottom: "50px",
          }}
        />

        {/* GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                border:
                  "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  height: "180px",
                  background: "#E5E7EB",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "14px",
                    background: "#E5E7EB",
                    borderRadius: "6px",
                    marginBottom: "18px",
                  }}
                />

                <div
                  style={{
                    width: "100%",
                    height: "22px",
                    background: "#E5E7EB",
                    borderRadius: "8px",
                    marginBottom: "12px",
                  }}
                />

                <div
                  style={{
                    width: "85%",
                    height: "22px",
                    background: "#E5E7EB",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                />

                <div
                  style={{
                    width: "100%",
                    height: "14px",
                    background: "#E5E7EB",
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}
                />

                <div
                  style={{
                    width: "70%",
                    height: "14px",
                    background: "#E5E7EB",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}