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
  try {
    const { createAdminClient } = await import("@/lib/lens/supabase/admin");
    const { decryptTokens } = await import("@/lib/lens/crypto");
    const admin = createAdminClient();

    const { data: connections } = await admin.from("connections").select("*").eq("status", "active");
    if (!connections || connections.length === 0) {
      return NextResponse.json({ status: "noop", note: "no active connections" });
    }

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 89);
    const startDate = start.toISOString().slice(0, 10);
    const endDate = end.toISOString().slice(0, 10);

    for (const conn of connections as any[]) {
      try {
        const impl = conn.provider === "ga4" ? (await import("@/lib/lens/integrations/ga4")).ga4Provider : (await import("@/lib/lens/integrations/gsc")).gscProvider;
        const plain = decryptTokens(conn.encrypted_tokens);
        const tokens = JSON.parse(plain);

        // Refresh tokens if needed
        const now = Date.now();
        let useTokens = tokens;
        if (tokens.expiresAt && tokens.expiresAt < now + 60 * 1000) {
          useTokens = await impl.refreshTokens(tokens);
          // re-encrypt & save
          const { encryptTokens } = await import("@/lib/lens/crypto");
          await admin.from("connections").update({ encrypted_tokens: encryptTokens(JSON.stringify(useTokens)) }).eq("id", conn.id);
        }

        const metricRows = await impl.fetchDailyMetrics(useTokens, conn.external_account_id, startDate, endDate);

        // Upsert rows into metrics_daily
        for (const r of metricRows) {
          await admin.from("metrics_daily").upsert(
            {
              client_id: conn.client_id,
              metric: r.metric,
              dimension: r.dimension ?? null,
              date: r.date,
              value: r.value,
            },
            { onConflict: "client_id,metric,date,dimension" },
          );
        }
      } catch (err) {
        console.error("Failed to sync connection", conn.id, err);
        await admin.from("connections").update({ status: "error" }).eq("id", conn.id);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "sync failed" }, { status: 500 });
  }
}
