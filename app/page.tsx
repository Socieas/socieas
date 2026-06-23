import JsonLd from "@/components/seo/JsonLd";
import { webPageSchema } from "@/lib/schema/pages";
import { generateSEOMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollingProof from "@/components/ScrollingProof";
import TrustSignals from "@/components/TrustSignals";
import FounderProblem from "@/components/FounderProblem";
import AttentionEconomy from "@/components/AttentionEconomy";
import BrandFlywheel from "@/components/BrandFlywheel";
import NobodyKnowsYou from "@/components/NobodyKnowsYou";
import StickyStory from "@/components/StickyStory";
import EditorialTimeline from "@/components/EditorialTimeline";
import EditorialProof from "@/components/EditorialProof";
import PlatformPresence from "@/components/PlatformPresence";
import InsightsPreview from "@/components/InsightsPreview";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
export const metadata =
  generateSEOMetadata({

    title:
            "AI Automation, CRM & IT Staffing Solutions for Growing Businesses",

    description:
            "Socieas helps startups and growing businesses scale with IT staffing, CRM implementation, AI automation, and digital marketing solutions.",

    path: "/",
  });
export default function Home() {
  const schema = webPageSchema({
    name: "Socieas | AI Automation, CRM & IT Staffing Agency in India",
    description: "Socieas helps startups and growing businesses scale with IT staffing, CRM implementation, AI automation, and digital marketing solutions.",
    url: "https://socieas.com",
  });
    return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--text)]">
            <JsonLd schema={schema} id="homepage-schema" />

      <Navbar />

      <Hero />

      <ScrollingProof />
      <TrustSignals />

      <FounderProblem />

      <AttentionEconomy />

      <BrandFlywheel />

      <NobodyKnowsYou />

      <StickyStory />

      <EditorialTimeline />

      <EditorialProof />
      <PlatformPresence />

      <InsightsPreview />

      <FinalCTA />

      <Footer />

    </main>
  );
}
