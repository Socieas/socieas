import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import {
  decryptSecret,
  refreshAccessToken,
} from "@/lib/lens/integrations/google-oauth";

const GRAPH_URL = "https://graph.facebook.com/v23.0";

type MetaPageOption = {
  id: string;
  name?: string;
  instagram_business_account?: {
    id: string;
    username?: string;
  };
};

async function getAccessToken(conn: {
  refresh_token_enc: string | null;
  access_token_enc: string;
}) {
  if (conn.refresh_token_enc) {
    const t = await refreshAccessToken(decryptSecret(conn.refresh_token_enc));
    return t.access_token;
  }
  return decryptSecret(conn.access_token_enc);
}

export async function GET(
  request: Request,
  ctx: { params: Promise<{ provider: string }> },
) {
  const { provider } = await ctx.params;
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId");
  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { data: conn } = await supabase
    .from("connections")
    .select("refresh_token_enc, access_token_enc, external_account_id")
    .eq("client_id", clientId)
    .eq("provider", provider)
    .maybeSingle();
  if (!conn) {
    return NextResponse.json({ error: "Not connected" }, { status: 404 });
  }

  try {
    const token = await getAccessToken(conn);
    let options: Array<{ id: string; label: string }> = [];

    if (provider === "ga4") {
      const res = await fetch(
        "https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          json?.error?.message ?? "Could not list GA4 properties",
        );
      }
      for (const acc of json.accountSummaries ?? []) {
        for (const p of acc.propertySummaries ?? []) {
          options.push({
            id: p.property,
            label: `${p.displayName} — ${acc.displayName}`,
          });
        }
      }
    } else if (provider === "gsc") {
      const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          json?.error?.message ?? "Could not list Search Console sites",
        );
      }
      options = (json.siteEntry ?? []).map((s: { siteUrl: string }) => ({
        id: s.siteUrl,
        label: s.siteUrl,
      }));
    } else if (provider === "facebook" || provider === "instagram") {
      const qs = new URLSearchParams({
        access_token: token,
        fields: "id,name,instagram_business_account{id,username}",
      });
      const res = await fetch(GRAPH_URL + "/me/accounts?" + qs.toString());
      const json = await res.json();
      if (!res.ok) {
        throw new Error(
          json?.error?.message ?? "Could not list Meta accounts",
        );
      }
      const pages = (json.data ?? []) as MetaPageOption[];
      if (provider === "facebook") {
        options = pages.map((p) => ({
          id: p.id,
          label: p.name ?? p.id,
        }));
        if (options.length === 0) {
          throw new Error(
            "No Facebook Pages found on this Meta login. Reconnect and grant page access.",
          );
        }
      } else {
        for (const p of pages) {
          const ig = p.instagram_business_account;
          if (!ig) continue;
          options.push({
            id: ig.id,
            label:
              (ig.username ? "@" + ig.username : ig.id) +
              " (" +
              (p.name ?? "page") +
              ")",
          });
        }
        if (options.length === 0) {
          throw new Error(
            "No Instagram business account is linked to your Facebook Pages. Link one in Meta Business settings, then reconnect.",
          );
        }
      }
    } else {
      return NextResponse.json(
        { error: "Provider not supported" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      options,
      selected: conn.external_account_id ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load accounts" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  ctx: { params: Promise<{ provider: string }> },
) {
  const { provider } = await ctx.params;
  const body = await request.json().catch(() => null);
  const clientId = body?.clientId as string | undefined;
  const accountId = body?.accountId as string | undefined;
  if (!clientId || !accountId) {
    return NextResponse.json(
      { error: "Missing clientId or accountId" },
      { status: 400 },
    );
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { error: updErr } = await supabase
    .from("connections")
    .update({ external_account_id: accountId })
    .eq("client_id", clientId)
    .eq("provider", provider);
  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  await supabase
    .from("metrics_daily")
    .delete()
    .eq("client_id", clientId)
    .eq("provider", provider);

  return NextResponse.json({ status: "ok" });
}