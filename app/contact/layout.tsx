import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Contact Socieas — Book a Free Strategy Call",
  description:
    "Talk to Socieas about personal branding, AI automation, CRM systems, and growth infrastructure. Serving founders in India, USA, UK, Australia, and UAE. Reply within 1–2 business days.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
