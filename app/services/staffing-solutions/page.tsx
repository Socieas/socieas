import StaffingSolutionsPage from "@/components/services/StaffingSolutionsPage";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata =
  generateSEOMetadata({

    title:
      "Staffing Solutions",

    description:
      "Socieas helps businesses scale teams efficiently through modern staffing systems, talent acquisition strategies, and workforce infrastructure.",

    path:
      "/services/staffing-solutions",

  });

export default function Page() {

  return <StaffingSolutionsPage />;
}