import AIAutomationPage from "@/components/services/AIAutomationPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "AI Automation Services",

    description:
      "Socieas helps businesses scale through AI automation systems, workflow infrastructure, reporting systems, lead routing, and operational optimization.",

    path:
      "/services/ai-automation",

  });

export default function Page() {

  return <AIAutomationPage />;
}