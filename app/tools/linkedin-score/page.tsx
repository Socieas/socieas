// app/tools/linkedin-score/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import LinkedInScoreTool from "@/components/tools/LinkedInScoreTool";

export const metadata: Metadata = {
  title: "The Socieas Score | Free LinkedIn Profile Audit",
  description:
    "Get your Socieas Score: your LinkedIn profile rated out of 100 in 90 seconds. A 22 point audit across first impression, positioning, content, social proof, and conversion, with your 3 highest impact fixes free.",
};

export default function LinkedInScorePage() {
  return (
    <main className="min-h-screen bg-[#F8F8F6] px-4 pb-24 pt-32 sm:px-6">
      {/* HERO */}
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full border border-violet-200 bg-white px-4 py-1.5 text-sm font-semibold text-violet-700">
          Free tool · 90 seconds
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#111111] sm:text-5xl">
          What is your <span className="gradient-text">Socieas Score?</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          The Socieas Score is the same 22 point LinkedIn audit we run for
          paying clients, automated. Paste your profile details, answer 12
          quick questions, and get your score out of 100 with your 3 highest
          impact fixes. Free.
        </p>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[32px] border border-slate-200">
          <Image
            src="/images/tools/linkedin-score.webp"
            alt="The Socieas Score, the free LinkedIn profile audit by Socieas"
            width={1600}
            height={1000}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>

      {/* THE TOOL */}
      <section className="mx-auto mt-16 max-w-3xl">
        <LinkedInScoreTool />
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto mt-16 max-w-2xl text-center">
        <p className="text-sm leading-relaxed text-slate-500">
          No spam, ever. Your answers are analyzed instantly in your browser
          and your report is yours to keep. The Socieas Score is built by
          Socieas, the team behind personal brands that actually convert.
        </p>
      </section>
    </main>
  );
}
