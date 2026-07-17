// lib/nurture-emails.ts

export interface NurtureInput {
  name: string;
  email: string;
  weakestPillar: string;
  goal: string;
}

interface NurtureEmail {
  subject: string;
  html: string;
}

function esc(text: string): string {
  return (text || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function shell(inner: string): string {
  return `
  <div style="background:#f7f7f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:24px;padding:36px;">
      ${inner}
      <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;">You are receiving this because you requested your Socieas Score at socieas.com. Reply with the word STOP and we will never email you again.</p>
    </div>
  </div>`;
}

function button(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:18px;background:#6d28d9;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:12px;text-decoration:none;">${label}</a>`;
}

function eyebrow(text: string): string {
  return `<p style="margin:0;font-size:13px;font-weight:700;letter-spacing:1px;color:#7c3aed;text-transform:uppercase;">${text}</p>`;
}

function goalLine(goal: string): string {
  if (!goal) return "";
  return `<p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">You told us your goal is to ${esc(goal.toLowerCase())}. Every point you recover moves you closer to it.</p>`;
}

function emailOne(p: NurtureInput): NurtureEmail {
  const inner = `
    ${eyebrow("Day 2 nudge")}
    <h1 style="margin:16px 0 0;font-size:24px;color:#111111;">Hi ${esc(p.name)}, your ${esc(p.weakestPillar)} is still waiting</h1>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">When you took the Socieas Score two days ago, your weakest pillar was <strong style="color:#111111;">${esc(p.weakestPillar)}</strong>. Most people read their report, feel motivated for one evening, and change nothing. The ones who win treat the report like a checklist.</p>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">Here is your only task this week: open your profile, find the ${esc(p.weakestPillar)} steps in your report, and spend 15 minutes on the first one. That is it.</p>
    ${goalLine(p.goal)}
    ${button("Run your score again", "https://socieas.com/tools/linkedin-score")}`;
  return {
    subject: `One small fix this week, ${p.name}`,
    html: shell(inner),
  };
}

function emailTwo(p: NurtureInput): NurtureEmail {
  const inner = `
    ${eyebrow("The bigger picture")}
    <h1 style="margin:16px 0 0;font-size:24px;color:#111111;">A strong profile is a system, not a page</h1>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">Hi ${esc(p.name)}, here is what we see after hundreds of audits: most profiles fail not because the person lacks skill, but because the profile has no system behind it.</p>
    <div style="background:#faf7ff;border:1px solid #ede9fe;border-radius:16px;padding:20px;margin-top:16px;">
      <p style="margin:0;font-size:15px;line-height:1.8;color:#111111;"><strong>1. Positioning.</strong> Your headline and about section tell the right visitor they are in the right place.</p>
      <p style="margin:12px 0 0;font-size:15px;line-height:1.8;color:#111111;"><strong>2. Proof.</strong> Featured work and recommendations remove doubt before the first conversation.</p>
      <p style="margin:12px 0 0;font-size:15px;line-height:1.8;color:#111111;"><strong>3. Rhythm.</strong> Consistent posts and comments keep you visible so the first two can do their job.</p>
    </div>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">Fix the profile first, then feed it with content. That is the exact order we install for clients, and it is the same order in your report. We also give away the systems themselves, free.</p>
    ${button("Steal our free systems", "https://socieas.com/resources")}`;
  return {
    subject: "The system behind profiles that win clients",
    html: shell(inner),
  };
}

function emailThree(p: NurtureInput): NurtureEmail {
  const inner = `
    ${eyebrow("An honest offer")}
    <h1 style="margin:16px 0 0;font-size:24px;color:#111111;">${esc(p.name)}, you have two ways forward</h1>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">Your report gave you the full plan. Some founders execute it themselves and get great results. Others would rather spend those hours running their business while specialists handle the brand.</p>
    ${goalLine(p.goal)}
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">That second path is exactly what we build at Socieas: positioning, a content engine, and lead systems that turn a profile into a pipeline.</p>
    <p style="margin:14px 0 0;font-size:15px;line-height:1.8;color:#4b5563;">If that sounds useful, reply to this email and tell us where you are stuck. A real person reads every reply. Or take a look at how we work first.</p>
    ${button("See how we work", "https://socieas.com/services")}`;
  return {
    subject: "Should we build it for you?",
    html: shell(inner),
  };
}

export async function scheduleNurtureEmails(input: NurtureInput): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || !fromEmail) return;

  const sequence = [
    { days: 2, email: emailOne(input) },
    { days: 5, email: emailTwo(input) },
    { days: 9, email: emailThree(input) },
  ];

  for (const item of sequence) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: input.email,
          subject: item.email.subject,
          html: item.email.html,
          scheduled_at: new Date(
            Date.now() + item.days * 24 * 60 * 60 * 1000
          ).toISOString(),
        }),
      });
    } catch {
      // Nurture emails must never break the main report flow.
    }
  }
}
