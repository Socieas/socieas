import { NextResponse } from "next/server";

/**
 * Daily metric sync. Trigger with a cron job (Hostinger cron or GitHub
 * Actions schedule) hitting this route with the CRON_SECRET header.
 *
 * Phase 1 flow:
 * 1. Load active connections (service role, bypasses RLS).
 * 2. For each: refresh tokens if expired, call provider.fetchDailyMetrics
 *    for the last 3 days (late data safety), upsert into metrics_daily.
 * 3. Record last_synced_at + status on the connection.
 * 4. After sync, run the insights detection rules for changed clients.
 */
export async function POST(request: Request) {
  if (request.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO Phase 1: implement the flow above.
  return NextResponse.json({ status: "noop", note: "Implement in Phase 1" });
}
