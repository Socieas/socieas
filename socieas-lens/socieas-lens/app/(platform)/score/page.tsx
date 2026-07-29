import { Card, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

/**
 * Socieas Score home inside the shared platform shell.
 * The existing Score engine (LinkedIn audit on socieas.com) migrates here;
 * the SGE / GEO / AEO scoring in lib/readiness is shared with Lens.
 */
const modules = [
  { title: "Website Audit", body: "Full crawl: technical SEO, content, and schema health." },
  { title: "SEO Analysis", body: "Rankings, on page signals, and internal link structure." },
  { title: "SGE Readiness", body: "How prepared the site is for AI overviews, with fixes." },
  { title: "GEO Analysis", body: "Entity, mention, and citation signals AI engines trust." },
  { title: "AEO Analysis", body: "Question coverage, snippets, and direct answer formatting." },
  { title: "Recommendations", body: "Prioritized fixes ordered by impact and effort." },
];

export default function ScoreHomePage() {
  return (
    <main className="px-6 py-10 lg:px-10">
      <h1 className="display text-3xl">Socieas Score</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Audit any website in minutes. Score explains every number and hands
        you the fixes, so the team always knows what to do next.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.title}>
            <CardTitle>{m.title}</CardTitle>
            <p className="mt-2 text-sm text-muted">{m.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/dashboard" variant="secondary">
          Back to Lens
        </ButtonLink>
      </div>
    </main>
  );
}
