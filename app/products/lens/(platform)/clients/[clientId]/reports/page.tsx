import { FileText } from "lucide-react";
import { Card } from "@/components/lens/ui/card";
import { Button } from "@/components/lens/ui/button";

const reportTypes = [
  { id: "weekly", title: "Weekly Report", body: "Snapshot of the week across every channel." },
  { id: "monthly", title: "Monthly Report", body: "The full month: growth, wins, and next steps." },
  { id: "quarterly", title: "Quarterly Report", body: "Strategic view of the quarter with trends." },
  { id: "seo", title: "SEO Report", body: "Queries, pages, rankings, and technical health." },
  { id: "social", title: "Social Media Report", body: "Reach, engagement, followers, top content." },
  { id: "executive", title: "Executive Summary", body: "One page. The numbers that matter and why." },
];

/**
 * Phase 2: POST /api/reports renders a print route with Puppeteer,
 * stores the PDF in Supabase Storage, and returns a share link.
 * Every report ships with client logo, branding, charts, and an AI summary.
 */
export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        One click, client ready. Reports use this client's logo and brand
        colors, include an AI written summary, and export as PDF, CSV, or
        Excel.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reportTypes.map((r) => (
          <Card key={r.id} className="flex flex-col gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft">
              <FileText className="h-5 w-5 text-brand" />
            </div>
            <h3 className="text-lg font-bold tracking-tight">{r.title}</h3>
            <p className="flex-1 text-sm text-muted">{r.body}</p>
            <Button variant="secondary" className="self-start">
              Generate PDF
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
