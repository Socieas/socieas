// app/privacy-policy/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Privacy Policy | Socieas",

  description:
    "Learn how Socieas collects, uses, and protects your information across our website, services, products, and communication systems.",

  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-x-hidden bg-white text-[#111111]">

      <Navbar />

      {/* HERO */}

      <section className="border-b border-black/5 bg-white pt-24 pb-10 md:pt-32 md:pb-14">

        <div className="mx-auto max-w-4xl px-6">

          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-700 md:text-sm">

            Privacy & Data Protection

          </div>

          <h1 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.05em] text-[#111111] md:text-6xl">

            Privacy Policy

          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6B7280] md:text-lg">

            This Privacy Policy explains how Socieas collects, uses, and protects information shared through our website, our services, our products such as Socieas Lens and Socieas Score, and our communication systems.

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

                  1. Information We Collect

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas may collect personal information submitted through contact forms, newsletter subscriptions, consultation requests, downloadable resources, product signups, and other interactions across the website.

                  <br />
                  <br />

                  This information may include your name, email address, phone number, company information, designation, and other details voluntarily shared with us.

                  <br />
                  <br />

                  When you create an account for a Socieas product such as Socieas Lens, we also collect your login email, your workspace details, and the client profiles you create, including client names, website addresses, brand colors, and logo links.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  2. How We Use Information

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Information collected through the website and our products may be used to:

                </p>

                <ul className="mt-5 space-y-3 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  <li>• Respond to inquiries and consultation requests</li>

                  <li>• Provide, operate, and improve our products and services</li>

                  <li>• Display analytics dashboards and reports inside Socieas Lens</li>

                  <li>• Improve website functionality and user experience</li>

                  <li>• Send updates, newsletters, and relevant resources</li>

                  <li>• Analyze engagement and website performance</li>

                  <li>• Deliver requested services or downloadable materials</li>

                </ul>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  3. Socieas Lens and Connected Platforms

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas Lens lets you connect marketing platforms such as Google Analytics, Google Search Console, YouTube, Facebook, and Instagram so you can view all of your performance data in one dashboard.

                  <br />
                  <br />

                  When you connect a platform, you grant Socieas Lens read only access through the official authorization flow of that platform. We only read reporting data such as sessions, pageviews, traffic sources, search clicks, impressions, keywords, followers, reach, engagement, subscribers, views, and watch time. We never post, edit, or delete anything on your connected accounts.

                  <br />
                  <br />

                  This data is used for one purpose only: to show your own analytics back to you and the people you invite to your workspace, in dashboards and reports. We do not sell this data, we do not use it for advertising, and we do not share it with anyone outside your workspace.

                  <br />
                  <br />

                  You can disconnect any platform at any time from the Integrations page inside Socieas Lens. Disconnecting removes our access immediately.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  4. Google User Data and Limited Use

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  When you connect Google Analytics, Google Search Console, or YouTube, Socieas Lens accesses Google user data strictly through read only permissions that you approve on the Google consent screen.

                  <br />
                  <br />

                  We access only the reporting data needed to display your dashboards and reports. This data is stored securely in our database, is shown only to your own workspace, and is deleted when you disconnect the platform or ask us to remove it.

                  <br />
                  <br />

                  Socieas Lens use and transfer of information received from Google APIs to any other app will adhere to the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-700 underline"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including the Limited Use requirements.

                  <br />
                  <br />

                  You can also remove our access at any time from your Google account security settings at{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-700 underline"
                  >
                    myaccount.google.com/permissions
                  </a>
                  .

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  5. YouTube API Services

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas Lens uses YouTube API Services to display your channel statistics. By connecting YouTube you agree to the{" "}
                  <a
                    href="https://www.youtube.com/t/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-700 underline"
                  >
                    YouTube Terms of Service
                  </a>
                  . Google handling of your data is described in the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-700 underline"
                  >
                    Google Privacy Policy
                  </a>
                  .

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  6. Data Protection and Storage

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas takes reasonable technical and organizational measures to protect personal information from unauthorized access, misuse, or disclosure.

                  <br />
                  <br />

                  Access credentials for connected platforms are encrypted before storage, all connections use secure encrypted transport, and analytics data is stored in access controlled infrastructure where each workspace can only see its own data.

                  <br />
                  <br />

                  However, no internet based system can guarantee complete security, and users share information at their own discretion.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  7. Data Retention and Deletion

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  We retain your analytics data for as long as your account is active so we can show historical trends in your dashboards and reports.

                  <br />
                  <br />

                  When you disconnect a platform, our access to that platform ends immediately. You may also request deletion of your stored data or your entire account at any time by contacting us, and we will remove it promptly.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  8. Third Party Services

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Socieas may use trusted third party services for website functionality, analytics, communication, authentication, data storage, and infrastructure management.

                  <br />
                  <br />

                  These services may include platforms such as Resend, Google Analytics, Vercel, Sanity, Supabase, Hostinger, and related operational tools, along with the official platform interfaces of Google, Meta, YouTube, and LinkedIn when you choose to connect them.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  9. Cookies & Analytics

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  The website may use cookies and analytics tools to understand user behavior, improve performance, and optimize website experience. Our products use cookies to keep you signed in securely.

                  <br />
                  <br />

                  Users can manage browser cookie settings independently through their device or browser preferences.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  10. User Rights

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  Users may request access, correction, deletion, or removal of their personal information by contacting Socieas directly.

                  <br />
                  <br />

                  Users may also unsubscribe from communications or newsletters at any time, disconnect any connected platform from inside Socieas Lens, and revoke Google access from their Google account security settings.

                </p>

              </div>

              {/* SECTION */}

              <div>

                <h2 className="text-2xl font-bold md:text-3xl">

                  11. Contact Information

                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#6B7280] md:text-lg">

                  For privacy related questions, requests, or data deletion, please contact:

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