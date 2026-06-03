import FadeUp from "./FadeUp";

export default function EditorialProof() {
  return (
    <FadeUp>
      <section className="relative overflow-hidden bg-[var(--soft-surface)] py-24 md:py-32">

        {/* GLOW */}
        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          {/* TOP */}
          <div className="max-w-5xl">

            <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
              Digital Presence System
            </div>

            <h2 className="mt-8 text-5xl font-black leading-[1.02] tracking-[-0.05em] text-[var(--text)] md:text-6xl">
              Strong founder brands
              <br />
              feel consistent
              <br />
              everywhere online.
            </h2>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[var(--muted)]">
              Modern trust is built through repeated,
              connected digital experiences across platforms.
            </p>

          </div>

          {/* MAIN GRID */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* CONTENT CARD */}
              <div className="hover-card rounded-[36px] border border-slate-200 bg-[var(--surface)] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

                <div className="flex items-center justify-between">

                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                    Content Consistency
                  </div>

                  <div className="text-3xl">
                    ✦
                  </div>

                </div>

                <h3 className="mt-8 text-3xl font-black leading-tight text-[var(--text)]">
                  Every platform should reinforce the same founder perception.
                </h3>

                <div className="mt-10 flex flex-wrap gap-3">

                  <div className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
                    LinkedIn
                  </div>

                  <div className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-600">
                    Instagram
                  </div>

                  <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
                    X / Twitter
                  </div>

                  <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600">
                    YouTube
                  </div>

                </div>

              </div>

              {/* UPDATED TOUCHPOINTS */}
              <div className="group relative overflow-hidden rounded-[36px] border border-violet-100 bg-[#F6F0FF] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(124,58,237,0.14)]">

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative">

                  {/* Header */}
                  <div className="flex items-center justify-between">

                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
                      Audience Touchpoints
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface)] shadow-sm">
                      <span className="text-3xl">
                        ✦
                      </span>
                    </div>

                  </div>

                  {/* Touchpoints */}
                  <div className="mt-10 space-y-4">

                    <div className="group/item flex items-center justify-between rounded-2xl border border-violet-100 bg-[var(--surface)] px-5 py-4 shadow-sm transition-all duration-300 hover:border-violet-200 hover:bg-violet-50">

                      <span className="font-medium text-[var(--text)]">
                        Founder Content
                      </span>

                      <span className="text-violet-500 transition-transform duration-300 group-hover/item:translate-x-1">
                        →
                      </span>

                    </div>

                    <div className="group/item flex items-center justify-between rounded-2xl border border-violet-100 bg-[var(--surface)] px-5 py-4 shadow-sm transition-all duration-300 hover:border-violet-200 hover:bg-violet-50">

                      <span className="font-medium text-[var(--text)]">
                        Brand Messaging
                      </span>

                      <span className="text-violet-500 transition-transform duration-300 group-hover/item:translate-x-1">
                        →
                      </span>

                    </div>

                    <div className="group/item flex items-center justify-between rounded-2xl border border-violet-100 bg-[var(--surface)] px-5 py-4 shadow-sm transition-all duration-300 hover:border-violet-200 hover:bg-violet-50">

                      <span className="font-medium text-[var(--text)]">
                        Visual Identity
                      </span>

                      <span className="text-violet-500 transition-transform duration-300 group-hover/item:translate-x-1">
                        →
                      </span>

                    </div>

                    <div className="group/item flex items-center justify-between rounded-2xl border border-violet-100 bg-[var(--surface)] px-5 py-4 shadow-sm transition-all duration-300 hover:border-violet-200 hover:bg-violet-50">

                      <span className="font-medium text-[var(--text)]">
                        Social Presence
                      </span>

                      <span className="text-violet-500 transition-transform duration-300 group-hover/item:translate-x-1">
                        →
                      </span>

                    </div>

                  </div>

                  {/* Accent Line */}
                  <div className="mt-10 h-[3px] w-24 rounded-full bg-violet-500" />

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-8">

              {/* SOCIAL UI */}
              <div className="hover-card rounded-[36px] border border-slate-200 bg-[var(--surface)] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                      Founder Feed
                    </div>

                    <div className="mt-3 text-2xl font-black leading-tight text-[var(--text)]">
                      Strategic visibility across channels.
                    </div>

                  </div>

                  <div className="flex gap-2">

                    <div className="h-3 w-3 rounded-full bg-violet-300" />

                    <div className="h-3 w-3 rounded-full bg-violet-400" />

                    <div className="h-3 w-3 rounded-full bg-violet-500" />

                  </div>

                </div>

                <div className="mt-10 space-y-5">

                  <div className="rounded-2xl bg-violet-50 px-5 py-5 font-medium text-[var(--text)]">
                    LinkedIn thought leadership content
                  </div>

                  <div className="rounded-2xl bg-pink-50 px-5 py-5 font-medium text-[var(--text)]">
                    Instagram founder storytelling
                  </div>

                  <div className="rounded-2xl bg-blue-50 px-5 py-5 font-medium text-[var(--text)]">
                    X/Twitter visibility loops
                  </div>

                </div>

              </div>

              {/* TRUST BLOCK */}
              <div className="hover-card rounded-[36px] border border-slate-200 bg-[var(--surface)] p-8 shadow-[0_20px_50px_rgba(124,58,237,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">

                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                  Trust Signal
                </div>

                <h3 className="mt-8 text-4xl font-black leading-tight text-[var(--text)]">
                  Strong positioning reduces trust friction dramatically.
                </h3>

                <p className="mt-8 text-lg leading-relaxed text-[var(--muted)]">
                  Modern buyers trust founders they consistently recognize online.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>
    </FadeUp>
  );
}