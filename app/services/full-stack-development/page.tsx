import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import FullStackDevelopmentPage from "@/components/services/FullStackDevelopmentPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Full Stack Development Services",
  description:
    "Socieas builds scalable digital products through full stack development, frontend systems, backend infrastructure, APIs, cloud deployment, and performance-focused engineering.",
  path: "/services/full-stack-development",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: "Full Stack Development Services",
            description:
              "Socieas builds scalable digital products through full stack development, frontend systems, backend infrastructure, and API integrations.",
            url: "https://socieas.com/services/full-stack-development",
            serviceType: "Full-Stack Development",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "Full Stack Development",
              url: "https://socieas.com/services/full-stack-development",
            },
          ]),
        ]}
        id="fullstack-page-schema"
      />
      <FullStackDevelopmentPage />
    </>
  );
}
