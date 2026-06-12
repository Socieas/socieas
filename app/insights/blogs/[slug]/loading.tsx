export default function Loading() {
  return (
    <main
      style={{
        background: "#F7F7F5",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            width: "140px",
            height: "38px",
            borderRadius: "999px",
            background: "#E5E7EB",
            marginBottom: "28px",
          }}
        />

        <div
          style={{
            width: "80%",
            height: "72px",
            borderRadius: "12px",
            background: "#E5E7EB",
            marginBottom: "22px",
          }}
        />

        <div
          style={{
            width: "60%",
            height: "24px",
            borderRadius: "8px",
            background: "#E5E7EB",
            marginBottom: "50px",
          }}
        />

        {/* HERO IMAGE */}

        <div
          style={{
            height: "520px",
            borderRadius: "28px",
            background: "#E5E7EB",
            marginBottom: "60px",
          }}
        />

        {/* ARTICLE */}

        <div
          style={{
            background: "white",
            borderRadius: "28px",
            padding: "40px",
            border:
              "1px solid #E5E7EB",
          }}
        >
          {Array.from({
            length: 16,
          }).map((_, index) => (
            <div
              key={index}
              style={{
                width:
                  index % 3 === 0
                    ? "80%"
                    : "100%",
                height: "18px",
                borderRadius: "8px",
                background: "#E5E7EB",
                marginBottom: "18px",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}