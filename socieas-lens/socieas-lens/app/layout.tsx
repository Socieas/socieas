import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Socieas Lens | Every metric. One lens.",
  description:
    "Socieas Lens is a growth intelligence platform. Connect every marketing platform once, see every metric in one dashboard, and get plain language explanations of what to do next.",
  openGraph: {
    title: "Socieas Lens | Every metric. One lens.",
    description:
      "One dashboard for all your digital growth. Connect. Analyze. Report. Grow.",
    siteName: "Socieas Lens",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
