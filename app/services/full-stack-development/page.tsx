import FullStackDevelopmentPage from "@/components/services/FullStackDevelopmentPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Full Stack Development Services",
  description:
    "Socieas builds scalable digital products through full stack development, frontend systems, backend infrastructure, APIs, cloud deployment, and performance-focused engineering.",
  path: "/services/full-stack-development",
});

export default function Page() {
  return <FullStackDevelopmentPage />;
}