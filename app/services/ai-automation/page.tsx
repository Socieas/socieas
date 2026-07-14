import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import InsightsEcosystem from "@/components/InsightsEcosystem";
import FadeUp from "@/components/FadeUp";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema/service";
import { breadcrumbSchema } from "@/lib/schema/breadcrumb";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "AI Automation Services for Business Growth",
  description:
    "Socieas builds AI automation systems for businesses worldwide. Lead routing, customer responses, CRM sync, and reporting handled by an intelligent layer on top of the tools you already use.",
  path: "/services/ai-automation",
});

const pageStyles = `
@keyframes riseIn {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floaty {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
@keyframes marqueeMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes growBar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes pulseLine {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
.rise { animation: riseIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.rise-2 { animation-delay: 0.15s; }
.rise-3 { animation-delay: 0.3s; }
.rise-4 { animation-delay: 0.45s; }
.floaty { animation: floaty 6s ease-in-out infinite; }
.floaty-late { animation: floaty 7s ease-in-out infinite; animation-delay: 1.4s; }
.marquee-track { display: flex; width: max-content; animation: marqueeMove 26s linear infinite; }
.bar-fill { transform-origin: left; animation: growBar 1.6s ease-out 0.3s both; }
.pulse-line { animation: pulseLine 2.4s ease-in-out infinite; }
`;

const pains = [
  { number: "01", label: "Leads wait hours for a reply" },
  { number: "02", label: "Data lives in five disconnected tools" },
  { number: "03", label: "Your team drowns in copy paste work" },
];

const adoption = [
  { value: "88%", width: "w-[88%]", label: "of enterprises now use AI automation in at least one function" },
  { value: "38%", width: "w-[38%]", label: "of small and mid businesses have already adopted AI automation" },
  { value: "74%", width: "w-[74%]", label: "of employees say automation helps them work faster" },
];

const automations = [
  { badge: "A", title: "Lead Qualification", text: "Every inquiry answered, scored, and routed in seconds." },
  { badge: "B", title: "Customer Responses", text: "Common questions handled instantly, around the clock." },
  { badge: "C", title: "CRM Sync", text: "Every contact and deal updated without human typing." },
  { badge: "D", title: "Smart Follow Up", text: "No lead forgotten. Sequences fire at the right moment." },
  { badge: "E", title: "Reporting", text: "Numbers land on one dashboard before you even ask." },
  { badge: "F", title: "Content Operations", text: "Drafting, scheduling, and repurposing on autopilot." },
];

const caseResults = [
  { value: "70%", label: "Less repetitive manual work" },
  { value: "80%", label: "Faster customer response times" },
  { value: "100%", label: "Centralized operational visibility" },
  { value: "24/7", label: "Automation running in the background" },
];

const transformation = [
  { before: "Manual replies", after: "AI qualification" },
  { before: "Spreadsheet updates", after: "Automatic CRM sync" },
  { before: "Slow email follow ups", after: "Smart routing" },
  { before: "Scattered systems", after: "One unified dashboard" },
];

const toolStack = [
  { name: "n8n", role: "Complex custom workflows with full control" },
  { name: "Make", role: "Visual automation for multi step operations" },
  { name: "Zapier", role: "Fast connections across 7000+ everyday apps" },
  { name: "OpenAI", role: "Language intelligence for replies and scoring" },
  { name: "HubSpot", role: "CRM where every lead and follow up lives" },
  { name: "Google Workspace", role: "Sheets, docs, and mail wired into flows" },
  { name: "Slack", role: "Instant alerts where your team already talks" },
  { name: "WhatsApp API", role: "Customer conversations answered instantly" },
];

const marqueeWords = [
  "Automate",
  "Integrate",
  "Accelerate",
  "Measure",
  "Scale",
  "Repeat",
];

const process = [
  { step: "01", title: "Map", text: "We audit your workflows and find the hours you are losing" },
  { step: "02", title: "Design", text: "We blueprint an automation ecosystem around your tools" },
  { step: "03", title: "Build", text: "We connect, test, and launch every flow with safeguards" },
  { step: "04", title: "Optimize", text: "We measure results and expand what proves its value" },
];

const ecosystem = [
  {
    href: "/services/digital-marketing",
    label: "Digital Marketing",
    text: "Automation scales the campaigns marketing launches.",
  },
  {
    href: "/services/crm-solutions",
    label: "CRM Solutions",
    text: "Your automations live inside a CRM built for follow up.",
  },
  {
    href: "/services/personal-branding",
    label: "Personal Branding",
    text: "Win hours back, then invest them in your authority.",
  },
  {
    href: "/services/full-stack-development",
    label: "Full Stack Development",
    text: "Custom systems when off the shelf tools hit limits.",
  },
];

const countries = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇦🇪", name: "UAE" },
];

const faqs = [
  {
    question: "What is AI automation for business?",
    answer:
      "AI automation is an intelligent layer that connects the tools you already use, handles repetitive work like lead replies, data entry, and reporting automatically, and keeps humans in control of the decisions that matter.",
  },
  {
    question: "Do we need to replace our current tools?",
    answer:
      "No. We build on top of what you already use. Your CRM, email, spreadsheets, and chat tools stay. The automation layer connects them so they finally work as one system.",
  },
  {
    question: "Which tools do you build with?",
    answer:
      "We work with n8n, Make, Zapier, OpenAI models, HubSpot, Google Workspace, Slack, and the WhatsApp API. The stack is chosen for your business, not the other way around.",
  },
  {
    question: "Will AI replace my team?",
    answer:
      "No. AI handles the repetitive work and your team ke
