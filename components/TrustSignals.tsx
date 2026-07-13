import FadeUp from "./FadeUp";

const stats = [
  { value: "5", label: "Countries Served" },
  { value: "10M+", label: "Content Reach" },
  { value: "500+", label: "Posts Published" },
  { value: "24h", label: "Response Time" },
];

const platforms = [
  {
    name: "Trustpilot",
    subtitle: "Verified Reviews",
    href: "https://www.trustpilot.com/review/socieas.com",
  },
  {
    name: "Google Reviews",
    subtitle: "Customer Feedback",
    href: "https://g.page/r/CZRSUSQ4ceKYEBM/review",
  },
  {
    name: "Sitejabber",
    subtitle: "Public Reputation",
    href: "https://www.smartcustomer.com/reviews/socieas.com",
  },
];

export default function TrustSignals() {
  return (
    <FadeUp>
      <section className="bg-[#111111] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-white md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-white/10"
              >
                <div>
                  <div className="font-bold text-white">{platform.name}</div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    {platform.subtitle}
                  </div>
                </div>
                <span className="text-sm tracking-widest text-amber-400">
                  ★★★★★
                </span>
              </a>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            Every review is public. Click any platform and read them yourself.
          </p>
        </div>
      </section>
    </FadeUp>
  );
}
