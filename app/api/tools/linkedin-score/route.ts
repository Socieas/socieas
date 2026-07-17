// app/api/tools/linkedin-score/route.ts

import { NextResponse } from "next/server";
import { generateAiFeedback, type AiFeedback } from "@/lib/ai-feedback";

interface PillarPayload {
  label: string;
  points: number;
  maxPoints: number;
  percent: number;
}

interface FixPayload {
  title: string;
  why: string;
  how: string;
  lostPoints: number;
}

interface ScorePayload {
  name: string;
  email: string;
  linkedinUrl: string;
  headline: string;
  about: string;
  answers: Record<string, string>;
  rawProfile?: string;
  result: {
    total: number;
    band: { label: string; headline: string; message: string };
    pillars: PillarPayload[];
    topFixes: FixPayload[];
  };
}

function esc(text: string): string {
  return (text || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderEmailHtml(p: ScorePayload, ai: AiFeedback | null): string {
  const pillarRows = p.result.pillars
    .map(
      (pl) =>
        `<tr>
          <td style="padding:10px 0;font-size:15px;color:#111111;font-weight:600;">${esc(pl.label)}</td>
          <td style="padding:10px 0;font-size:15px;color:#6b7280;text-align:right;">${pl.points} of ${pl.maxPoints}</td>
        </tr>`
    )
    .join("");

  const aiSummaryBlock = ai
    ? `<div style="background:linear-gradient(135deg,#f5f3ff,#fdf4ff);border:1px solid #ede9fe;border-radius:16px;padding:24px;margin-top:28px;">
        <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:1px;color:#7c3aed;text-transform:uppercase;">Your expert read</p>
        <p style="margin:12px 0 0;font-size:15px;line-height:1.8;color:#374151;">${esc(ai.summary)}</p>
      </div>`
    : "";

  const headlineVerdictLine =
    ai && ai.headlineVerdict
      ? `<p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#4b5563;"><strong style="color:#7c3aed;">The verdict:</strong> ${esc(ai.headlineVerdict)}</p>`
      : "";

  const headlineBlock = ai
    ? `<h2 style="margin:30px 0 6px;font-size:18px;color:#111111;">Your headline, rewritten by our strategist</h2>
      <p style="margin:6px 0 0;font-size:14px;line-height:1.7;color:#6b7280;">Your headline today: "${esc(p.headline)}"</p>
      ${headlineVerdictLine}
      ${ai.headlineRewrites
        .map(
          (h, i) =>
            `<div style="background:#faf7ff;border:1px solid #ede9fe;border-radius:16px;padding:18px;margin-top:12px;">
              <p style="margin:0;font-size:13px;font-weight:700;color:#7c3aed;">Option ${i + 1}</p>
              <p style="margin:8px 0 0;font-size:15px;line-height:1.7;color:#111111;font-weight:600;">${esc(h)}</p>
            </div>`
        )
        .join("")}`
    : "";

  const aboutBlock =
    ai && ai.aboutRewrite
      ? `<h2 style="margin:30px 0 6px;font-size:18px;color:#111111;">Your about section, rewritten for you</h2>
        ${ai.aboutVerdict ? `<p style="margin:6px 0 0;font-size:14px;line-height:1.7;color:#4b5563;"><strong style="color:#7c3aed;">The verdict:</strong> ${esc(ai.aboutVerdict)}</p>` : ""}
        <div style="background:#faf7ff;border:1px solid #ede9fe;border-radius:16px;padding:18px;margin-top:12px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#7c3aed;">Ready to paste</p>
          <p style="margin:8px 0 0;font-size:15px;line-height:1.8;color:#111111;white-space:pre-line;">${esc(ai.aboutRewrite)}</p>
        </div>`
      : "";

  const fixBlocks = p.result.topFixes
    .slice(0, 3)
    .map((f, i) => {
      const upgrade = ai ? ai.fixUpgrades[i] : undefined;
      const upgradeLine = upgrade
        ? `<p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#4b5563;"><strong style="color:#7c3aed;">Expert upgrade:</strong> ${esc(upgrade.advice)}</p>`
        : "";
      return `<div style="background:#faf7ff;border:1px solid #ede9fe;border-radius:16px;padding:20px;margin-top:14px;">
          <p style="margin:0;font-size:16px;font-weight:700;color:#111111;">${i + 1}. ${esc(f.title)} <span style="color:#7c3aed;">(+${f.lostPoints} points)</span></p>
          <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#4b5563;"><strong style="color:#111111;">Why it matters:</strong> ${esc(f.why)}</p>
          <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#4b5563;"><strong style="color:#111111;">How to fix it:</strong> ${esc(f.how)}</p>
          ${upgradeLine}
        </div>`;
    })
    .join("");

  return `
  <div style="background:#f7f7f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:24px;padding:36px;">
      <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:1px;color:#7c3aed;text-transform:uppercase;">Your Socieas Score Report</p>
      <h1 style="margin:16px 0 0;font-size:26px;color:#111111;">Hi ${esc(p.name)}, your Socieas Score is ${p.result.total} of 100</h1>
      <p style="margin:8px 0 0;font-size:15px;color:#7c3aed;font-weight:700;">${esc(p.result.band.label)}</p>
      <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#4b5563;">${esc(p.result.band.message)}</p>

      ${aiSummaryBlock}

      <h2 style="margin:30px 0 6px;font-size:18px;color:#111111;">Your 5 pillar breakdown</h2>
      <table style="width:100%;border-collapse:collapse;">${pillarRows}</table>

      ${headlineBlock}

      ${aboutBlock}

      <h2 style="margin:30px 0 0;font-size:18px;color:#111111;">Your 3 highest impact fixes</h2>
      ${fixBlocks}

      <div style="background:linear-gradient(135deg,#f5f3ff,#fdf4ff);border-radius:16px;padding:24px;margin-top:28px;">
        <p style="margin:0;font-size:16px;font-weight:700;color:#111111;">Want the full transformation?</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#4b5563;">The premium plan gives you a personalized 30 day branding calendar built from your weakest pillars, headline and about rewrite formulas, and a priority strategy call.</p>
        <a href="https://socieas.com/tools/linkedin-score" style="display:inline-block;margin-top:14px;background:#6d28d9;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:12px;text-decoration:none;">Visit The Socieas Score</a>
      </div>

      <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;">Sent by Socieas because you requested your Socieas Score at socieas.com.</p>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ScorePayload;

    if (
      !body ||
      !body.name ||
      !body.email ||
      !body.result ||
      typeof body.result.total !== "number"
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/linkedin_scores`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          linkedin_url: body.linkedinUrl,
          headline: body.headline,
          about_section: body.about,
          answers: body.answers,
          total_score: body.result.total,
          pillars: body.result.pillars,
          top_fixes: body.result.topFixes,
        }),
      });
    }

    let ai: AiFeedback | null = null;
    try {
      ai = await generateAiFeedback({
        name: body.name,
        headline: body.headline || "",
        about: body.about || "",
        total: body.result.total,
        bandLabel: body.result.band.label,
        pillars: body.result.pillars.map((pl) => ({
          label: pl.label,
          points: pl.points,
          maxPoints: pl.maxPoints,
        })),
        topFixes: body.result.topFixes.slice(0, 3).map((f) => ({
          title: f.title,
          why: f.why,
          how: f.how,
        })),
        rawProfile: body.rawProfile || "",
      });
    } catch {
      ai = null;
    }

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (resendKey && fromEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: body.email,
          subject: `Your Socieas Score: ${body.result.total} of 100`,
          html: renderEmailHtml(body, ai),
        }),
      });
    }

    return NextResponse.json({ ok: true, ai });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
