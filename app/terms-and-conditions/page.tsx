// app/terms-and-conditions/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Terms & Conditions | Socieas",

  description:
    "Review the terms and conditions governing the use of Socieas services, website, content, and digital infrastructure.",

  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <main className="overflow-x-hidden bg-white text-[#111111]">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-black/5 bg-white pt-24 pb-10 md:pt-32 md:pb-14">

        <div className="mx-auto max-w-4xl px-6">

          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 md:text-sm">

            Website Usage & Services

          </div>

          <h1 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.05em] text-[#111111] md:text-6xl">

            Terms & Conditions

          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6B7280] md:text-lg">

            These Terms & Conditions govern the use of the Socieas website, services, digital platforms, content, and communication systems.

          </p>

        </div>

      </section>

      {/* CONTENT */}

      <section className="py-12 md:py-16">

        <div className="mx-auto max-w-4xl px-6">

          <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(124,58,237,0.04)] md:p-10">

            <div className="space-y-10">

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  1. Acceptance of Terms

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  By accessing or using the Socieas website, users agree to comply with these Terms & Conditions and all applicable laws and regulations.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  2. Services

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas provides digital services including branding, automation, CRM solutions, marketing systems, founder positioning, technology consulting, and related operational services.

                  <br />
                  <br />

                  Service scope, timelines, deliverables, and pricing may vary depending on project requirements and agreements.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  3. Intellectual Property

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  All website content, branding, graphics, frameworks, resources, designs, and digital materials remain the intellectual property of Socieas unless otherwise stated.

                  <br />
                  <br />

                  Unauthorized reproduction, redistribution, or misuse of website content is prohibited.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  4. Limitation of Liability

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas is not liable for indirect, incidental, or consequential damages arising from the use of the website, digital services, external integrations, or third-party platforms.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  5. External Links

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  The website may contain links to third-party websites or services. Socieas is not responsible for external website content, security, or operational practices.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  6. Modifications

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas reserves the right to modify these Terms & Conditions at any time without prior notice.

                  <br />
                  <br />

                  Continued use of the website after updates constitutes acceptance of the revised terms.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  7. Contact Information

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  For questions regarding these Terms & Conditions, please contact:

                </p>

                <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4 text-base font-medium text-violet-700 md:text-lg">

                  hello@socieas.com

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}