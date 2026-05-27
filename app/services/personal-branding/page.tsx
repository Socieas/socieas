import PersonalBrandingPage from "@/components/services/PersonalBrandingPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Personal Branding Services",

    description:
      "Socieas helps founders and professionals build visibility, authority, audience trust, and long term positioning through strategic personal branding.",

    path:
      "/services/personal-branding",

  });

export default function Page() {

  return <PersonalBrandingPage />;
}