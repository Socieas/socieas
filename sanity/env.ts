export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-12";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

if (projectId === "placeholder") {
  console.warn(
    "Sanity project ID is set to 'placeholder'. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables."
  );
}
