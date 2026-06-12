import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Socieas",
  description:
    "Explore Socieas services: personal branding, CRM solutions, AI automation, full-stack development, digital marketing, and IT staffing for growing businesses.",
  openGraph: {
    title: "Our Services | Socieas",
    description:
      "Explore Socieas services: personal branding, CRM solutions, AI automation, full-stack development, digital marketing, and IT staffing for growing businesses.",
    url: "https://socieas.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
