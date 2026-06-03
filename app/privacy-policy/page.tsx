// app/privacy-policy/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Privacy Policy | Socieas",

  description:
    "Learn how Socieas collects, uses, and protects your information across our website, services, and communication systems.",

  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-x-hidden bg-[var(--surface)] text-[var(--text)]">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-black/5 bg-[var(--surface)] pt-24 pb-10 md:pt-32 md:pb-14">

        <div className="mx-auto max-w-4xl px-6">

          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 md:text-sm">

            Privacy & Data Protection

          </div>

          <h1 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.05em] text-[var(--text)] md:text-6xl">

            Privacy Policy

          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6B7280] md:text-lg">

            This Privacy Policy explains how Socieas collects, uses, and protects information shared through our website, services, forms, and communication systems.

          </p>

        </div>

      </section>

      {/* CONTENT */}

      <section className="py-12 md:py-16">

        <div className="mx-auto max-w-4xl px-6">

          <div className="rounded-[32px] border border-black/5 bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(124,58,237,0.04)] md:p-10">

            <div className="space-y-10">

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  1. Information We Collect

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas may collect personal information submitted through contact forms, newsletter subscriptions, consultation requests, downloadable resources, and other interactions across the website.

                  <br />
                  <br />

                  This information may include your name, email address, phone number, company information, designation, and other details voluntarily shared with us.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  2. How We Use Information

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Information collected through the website may be used to:

                </p>

                <ul className="mt-5 space-y-3 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  <li>• Respond to inquiries and consultation requests</li>

                  <li>• Improve website functionality and user experience</li>

                  <li>• Send updates, newsletters, and relevant resources</li>

                  <li>• Analyze engagement and website performance</li>

                  <li>• Deliver requested services or downloadable materials</li>

                </ul>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  3. Data Protection

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas takes reasonable technical and organizational measures to protect personal information from unauthorized access, misuse, or disclosure.

                  <br />
                  <br />

                  However, no internet-based system can guarantee complete security, and users share information at their own discretion.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  4. Third-Party Services

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas may use trusted third-party services for website functionality, analytics, communication, and infrastructure management.

                  <br />
                  <br />

                  These services may include platforms such as Resend, Google Analytics, Vercel, Sanity, and related operational tools.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  5. Cookies & Analytics

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  The website may use cookies and analytics tools to understand user behavior, improve performance, and optimize website experience.

                  <br />
                  <br />

                  Users can manage browser cookie settings independently through their device or browser preferences.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  6. User Rights

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Users may request access, correction, deletion, or removal of their personal information by contacting Socieas directly.

                  <br />
                  <br />

                  Users may also unsubscribe from communications or newsletters at any time.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  7. Contact Information

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  For privacy-related questions or requests, please contact:

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