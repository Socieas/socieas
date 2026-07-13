import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Personal Branding Services for Founders and Professionals",
  description:
    "Socieas helps founders, consultants, creators, and professionals build authority through personal branding, LinkedIn content, storytelling, positioning, and lead generation systems.",
  path: "/services/personal-branding",
});

const brandSystem = [
  {
    title: "Position",
    text: "We define your audience, category, promise, and point of view so people understand what you want to be known for.",
  },
  {
    title: "Story",
    text: "We shape your journey into a clear human narrative that builds trust before the first conversation.",
  },
  {
    title: "Signal",
    text: "We create content themes that repeat the right ideas until your audience remembers your name.",
  },
  {
    title: "System",
    text: "We turn your expertise into a repeatable content engine for LinkedIn, your website, and your lead funnel.",
  },
];

const deliverables = [
  "Personal brand positioning",
  "Founder story and authority narrative",
  "LinkedIn profile improvement",
  "Content pillars and message map",
  "Signature framework development",
  "Thought leadership post ideas",
  "Monthly content direction",
  "Profile to lead funnel strategy",
];

const faqs = [
  {
    question: "What is personal branding?",
    answer:
      "Personal branding is the process of making your expertise, story, values, and point of view clear to the people you want to reach. It helps your audience understand why they should trust you.",
  },
  {
    question: "Who needs personal branding services?",
    answer:
      "Founders, consultants, creators, coaches, service providers, and professionals need personal branding when they want more visibility, trust, authority, and better business opportunities.",
  },
  {
    question: "How does Socieas build a personal brand?",
    answer:
      "Socieas builds personal brands through positioning, story development, content strategy, LinkedIn optimization, authority building, and a repeatable system that supports lead generation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Personal Branding Services",
  serviceType: "Personal Branding",
  provider: {
    "@type": "Organization",
    name: "Socieas",
    url: "https://socieas.com",
  },
  areaServed: "Worldwide",
  description:
    "Socieas helps founders, consultants, creators, and professionals build authority through personal branding, LinkedIn content, storytelling, positioning, and lead generation systems.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://socieas.com/services/personal-branding",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://socieas.com/services/personal-branding",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function PersonalBrandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML= __html: JSON.stringify(jsonLd) 
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML= __html: JSON.stringify(faqJsonLd) 
      />

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_35%),linear-gradient(135deg,#ffffff,#f8fafc)] px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              Personal Branding Services
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Build a personal brand people trust before they speak to you
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Socieas helps founders, consultants, creators, and professionals
              turn their expertise into clear positioning, meaningful content,
              stronger authority, and a system that attracts the right
              opportunities.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-violet-700 px-7 py-4 text-center text-base font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800"
              >
                Build My Personal Brand
              </Link>

              <Link
                href="#brand-system"
                className="rounded-full border border-slate-300 px-7 py-4 text-center text-base font-semibold text-slate-900 transition hover:border-violet-500 hover:text-violet-700"
              >
                See The Brand System
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-violet-100 bg-white p-5 shadow-2xl shadow-violet-100">
              <div className="overflow-hidden rounded-[1.5rem] bg-slate-950">
                <img
                  src="/images/personal-branding-banner.webp"
                  alt="Founder personal branding system showing visibility trust authority and inbound leads"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700">
                <div className="rounded-2xl bg-violet-50 p-4">Visibility</div>
                <div className="rounded-2xl bg-blue-50 p-4">Trust</div>
                <div className="rounded-2xl bg-fuchsia-50 p-4">Authority</div>
                <div className="rounded-2xl bg-emerald-50 p-4">
                  Inbound Leads
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-white p-5 shadow-xl lg:block">
              <p className="max-w-xs text-sm font-medium text-slate-700">
                Your name is already creating an impression. We help you make it
                intentional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
            The Real Problem
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Most experts are invisible because their value lives only in their
            head
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            You may have the skill, proof, and experience. But if people cannot
            understand what you stand for, who you help, and why they should
            trust you, your expertise stays hidden.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              What We Believe
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Personal branding is not content. It is trust built in public
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-700">
              A strong personal brand makes your expertise easier to understand,
              easier to trust, and easier to share. It turns your name into a
              business asset that compounds over time.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2" id="brand-system">
            {brandSystem.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
              What You Get
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A clear personal brand system built around your expertise
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-700">
              We help you find the ideas only you can own, the stories only you
              can tell, and the message your audience needs to hear consistently.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-base font-medium text-slate-800 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-300">
            Why It Works
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            People do not connect with perfect brands. They connect with clear
            humans.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Your audience needs to know what you believe, how you think, and why
            you understand their world. That is what makes you easier to find,
            easier to believe, and easier to choose.
          </p>

          <div className="mt-9">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-violet-100"
            >
              Start Building My Brand
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-700">
            Questions
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Personal branding questions people ask
          </h2>

          <div className="mt-10 space-y-5">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  {item.question}
                </h3>
                <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
