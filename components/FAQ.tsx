import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

const faqs = [
  {
    q: "What does Socieas do?",
    a: "Socieas is a growth agency that builds personal brands for founders and installs the systems behind them: strategic content, CRM, AI automation, websites, and digital marketing. We serve clients in India, the USA, UK, Australia, and UAE.",
  },
  {
    q: "How long does personal branding take to show results?",
    a: "Most founders see meaningful visibility growth within 60 to 90 days of consistent publishing, and inbound leads typically start between months 3 and 6. Authority compounds, so the system gets stronger every month.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Socieas works remotely with founders and businesses in India, the United States, United Kingdom, Australia, and the UAE, with async communication and calls scheduled across time zones.",
  },
  {
    q: "What makes Socieas different from a social media agency?",
    a: "Social media agencies post content. Socieas builds the full growth system: positioning, content, the CRM that captures interest, and the AI automation that follows up. That way visibility actually converts into revenue.",
  },
  {
    q: "How much do Socieas services cost?",
    a: "Engagements are scoped to your goals after a free strategy call. Most clients start with a single system such as personal branding, CRM, or automation, and expand as results compound.",
  },
  {
    q: "How do I get started with Socieas?",
    a: "Book a free strategy call through the contact page. You will get a clear assessment of your current visibility and a prioritized plan, whether or not you decide to work with us.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FAQ() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-violet-600">
            Questions, Answered
          </div>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-3xl border border-slate-200 bg-[#F8F8F6] p-5 transition-all duration-300 hover:border-violet-200 open:bg-white open:shadow-lg"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-[#111111]">
                {faq.q}
                <ChevronDown
                  size={20}
                  className="shrink-0 text-violet-600 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd id="faq-schema" schema={faqSchema} />
    </section>
  );
}
