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
      "Personal Branding & Growth Systems",

    description:
      "Socieas builds scalable visibility systems through personal branding, CRM implementation, SEO, AI automation, and growth-focused digital infrastructure.",

    path: "/",
  });
export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[var(--background)] text-[var(--text)]">

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