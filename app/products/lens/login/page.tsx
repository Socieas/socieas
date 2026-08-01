import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthForm } from "@/components/lens/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign in | Socieas Lens",
  description:
    "Sign in to Socieas Lens or create a free account. Every client, every channel, one dashboard.",
};

const highlights = [
  {
    title: "All channels, one lens",
    text: "Website, search and social analytics for every client in a single live dashboard.",
  },
  {
    title: "Reports clients love",
    text: "Beautiful monthly reports with charts, AI suggestions and one click PDF or CSV download.",
  },
  {
    title: "Lens AI included",
    text: "Best time to post, keyword wins and growth suggestions generated from your own data.",
  },
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const sp = await searchParams;
  const initialMode = sp.mode === "signup" ? "signup" : "signin";

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden pt-24">
        <section className="relative px-6 pb-16 pt-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-fuchsia-100/40 blur-[140px]" />
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2 text-sm font-semibold text-brand shadow-card">
                Socieas Lens
              </span>
              <h1 className="display mt-6 text-4xl md:text-5xl">
                Your clients&apos; growth,{" "}
                <span className="gradient-text">in one place.</span>
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                Live infographics, AI suggestions and client ready reports for
                every channel you manage.
              </p>
              <Image
                src="/lens/img/login-hero.webp"
                alt="Preview of the Socieas Lens analytics dashboard"
                width={1200}
                height={900}
                priority
                className="mt-8 w-full rounded-card border border-line shadow-card"
              />
            </div>

            <div className="w-full max-w-md justify-self-center lg:justify-self-end">
              <AuthForm initialMode={initialMode} />
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-card border border-line bg-surface p-6 shadow-card"
              >
                <h2 className="text-lg font-bold tracking-tight">{h.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}