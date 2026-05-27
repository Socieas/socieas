import DigitalMarketingPage from "@/components/services/DigitalMarketingPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Digital Marketing Services",

    description:
      "Socieas helps businesses scale visibility, lead generation, audience trust, and growth through modern digital marketing systems.",

    path:
      "/services/digital-marketing",

  });

export default function Page() {

  return <DigitalMarketingPage />;
}