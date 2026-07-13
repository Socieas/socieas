import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import AIAutomationPage from "@/components/services/AIAutomationPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "AI Automation Services",
  description:
    "Socieas helps businesses scale through AI automation systems, workflow infrastructure, reporting systems, lead routing, and operational optimization.",
  path: "/services/ai-automation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema({
            name: "AI Automation Services",
            description:
              "Socieas delivers AI automation solutions that help businesses automate workflows, reduce manual effort, and scale operations efficiently.",
            url: "https://socieas.com/services/ai-automation",
            serviceType: "AI Automation",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://socieas.com" },
            { name: "Services", url: "https://socieas.com/services" },
            {
              name: "AI Automation",
              url: "https://socieas.com/services/ai-automation",
            },
          ]),
        ]}
        id="ai-automation-page-schema"
      />
      <AIAutomationPage />
    </>
  );
}
