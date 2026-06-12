export default function Loading() {

  return (

    <div
      style={{
        minHeight:
          "100vh",

        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "#F7F7F5",
      }}
    >

      <div
        style={{
          width: "48px",

          height: "48px",

          border:
            "4px solid #E5E7EB",

          borderTop:
            "4px solid #7C3AED",

          borderRadius:
            "999px",

          animation:
            "spin 1s linear infinite",
        }}
      />

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  );
}