import { NextResponse } from "next/server";

/**
 * Report generation. POST { clientId, type, periodStart, periodEnd }.
 *
 * Phase 2 flow:
 * 1. Query metrics_daily + insights for the period.
 * 2. Ask the LLM for an executive summary (numbers from the query only).
 * 3. Render /reports/print/[token] (a print styled route using the same
 *    chart components) with Puppeteer to PDF.
 * 4. Store the PDF in Supabase Storage; insert a `reports` row; return the
 *    share link. CSV/Excel exports stream straight from the query.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.clientId || !body?.type) {
    return NextResponse.json({ error: "clientId and type are required" }, { status: 400 });
  }

  // TODO Phase 2: implement the flow above.
  return NextResponse.json({ status: "queued", note: "Implement in Phase 2" });
}
