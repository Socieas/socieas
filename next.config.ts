import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
