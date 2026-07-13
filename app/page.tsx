import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema/pages";
import { generateSEOMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeStory from "@/components/HomeStory";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const metadata = generateSEOMetadata({
  title: "Personal Branding & AI Growth Systems for Founders",
  description:
    "Socieas helps founders and B2B businesses in India, USA, UK, Australia, and UAE build authority through personal branding, content systems, CRM, and AI automation.",
  path: "/",
});

export default function Home() {
  const schema = webPageSchema({
    name: "Socieas | Personal Branding & AI Growth Systems for Founders",
    description:
      "Socieas helps founders and B2B businesses in India, USA, UK, Australia, and UAE build authority through personal branding, content systems, CRM, and AI automation.",
    url: "https://socieas.com",
  });

  return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--text)]">
      <JsonLd schema={schema} id="homepage-schema" />
      <Navbar />
      <Hero />
      <HomeStory />
      <FinalCTA />
      <Footer />
    </main>
  );
}
