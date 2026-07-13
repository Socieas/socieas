import Image from "next/image";
import FadeUp from "./FadeUp";

const platforms = [
  {
    name: "Trustpilot",
    logo: "/images/logos/trustpilot.svg",
    subtitle: "Verified Reviews",
    href: "https://www.trustpilot.com/review/socieas.com",
  },
  {
    name: "Google Reviews",
    logo: "/images/logos/google.svg",
    subtitle: "Customer Feedback",
    href: "https://g.page/r/CZRSUSQ4ceKYEBM/review",
  },
  {
    name: "Sitejabber",
    logo: "/images/logos/sitejabber.svg",
    subtitle: "Public Reputation",
    href: "https://www.smartcustomer.com/reviews/socieas.com",
  },
];

export default function TrustSignals() {
  return (
    <FadeUp>
      <section className="bg-[#F8F8F6] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-violet-600">
              Independent Reviews
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
              Don&apos;t take our word for it.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every review below is public and written by real clients. Read
              them before you book a call. We prefer it that way.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                <div className="flex h-12 items-center">
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={140}
                    height={40}
                    className="h-auto w-auto max-h-10"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-[#111111]">
                    {platform.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {platform.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
