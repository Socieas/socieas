import { NextResponse } from "next/server";

// -- Cloudflare Turnstile verification
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Missing TURNSTILE_SECRET_KEY environment variable.");
    return false;
  }

  const formData = new URLSearchParams();
  formData.append("secret", secret);
  formData.append("response", token);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }
  );
  const data = await res.json();
  return data.success === true;
}

// -- POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, goal, message, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstile(turnstileToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Security check failed" },
        { status: 400 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const notifyEmail = process.env.NOTIFY_EMAIL || "hello@socieas.com";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://socieas.com";

    // Internal notification template
    const internalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; color: #111827; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb; }
    .header { background-color: #7c3aed; padding: 32px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
    .content { padding: 40px; }
    .field { margin-bottom: 24px; }
    .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 8px; }
    .value { font-size: 16px; color: #111827; line-height: 1.5; }
    .message-box { background-color: #f3f4f6; border-radius: 12px; padding: 24px; border-left: 4px solid #7c3aed; margin-top: 8px; }
    .footer { padding: 24px; text-align: center; font-size: 12px; color: #9ca3af; background-color: #f9fafb; border-top: 1px solid #e5e7eb; }
    a { color: #7c3aed; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Growth Inquiry</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value"><strong>${name}</strong> (${email})</div>
      </div>
      ${company ? `
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${company}</div>
      </div>` : ''}
      <div class="field">
        <div class="label">Primary Goal</div>
        <div class="value"><span style="background-color: #f5f3ff; color: #7c3aed; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 600;">${goal || "General Inquiry"}</span></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">
          <div class="value" style="white-space: pre-wrap;">${message}</div>
        </div>
      </div>
      <div style="margin-top: 40px; text-align: center;">
        <a href="mailto:${email}" style="background-color: #111827; color: #ffffff; padding: 14px 28px; border-radius: 12px; display: inline-block; font-size: 14px; font-weight: 700;">Reply to ${name}</a>
      </div>
    </div>
    <div class="footer">
      Sent from Socieas.com Contact Form
    </div>
  </div>
</body>
</html>
    `;

    // User confirmation template
    const userHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #111827; -webkit-font-smoothing: antialiased; }
    .wrapper { background-color: #ffffff; width: 100%; table-layout: fixed; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { padding: 40px 20px; text-align: center; }
    .logo { font-size: 32px; font-weight: 900; letter-spacing: -0.05em; color: #111827; text-decoration: none; }
    .dot { color: #7c3aed; }
    .hero { padding: 0 40px 40px; text-align: center; }
    .hero h2 { font-size: 28px; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 16px; color: #111827; }
    .hero p { font-size: 18px; line-height: 1.6; color: #4b5563; margin: 0; }
    .cta-section { padding: 40px; background-color: #f5f3ff; border-radius: 32px; margin: 0 20px 40px; }
    .cta-header { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7c3aed; margin-bottom: 24px; text-align: center; }
    .card { background-color: #ffffff; border-radius: 20px; padding: 24px; margin-bottom: 16px; border: 1px solid #e5e7eb; text-decoration: none; display: block; transition: transform 0.2s ease; }
    .card-title { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 4px; display: block; }
    .card-desc { font-size: 14px; color: #6b7280; display: block; }
    .footer { padding: 60px 40px; text-align: center; border-top: 1px solid #f3f4f6; }
    .footer p { font-size: 14px; color: #9ca3af; margin: 0 0 16px; }
    .social-links { margin-bottom: 24px; }
    .social-links a { color: #7c3aed; text-decoration: none; font-size: 14px; font-weight: 600; margin: 0 12px; }
    @media screen and (max-width: 600px) {
      .hero { padding: 0 20px 40px; }
      .hero h2 { font-size: 24px; }
      .hero p { font-size: 16px; }
      .cta-section { padding: 32px 20px; border-radius: 24px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <a href="${siteUrl}" class="logo">Socieas<span class="dot">.</span></a>
      </div>

      <div class="hero">
        <h2>We&apos;ve received your inquiry.</h2>
        <p>Hi ${name}, thanks for reaching out. Our team is reviewing your message and will get back to you within 1&ndash;2 business days to discuss how we can help you scale with clarity and precision.</p>
      </div>

      <div class="cta-section">
        <div class="cta-header">While you wait</div>

        <a href="${siteUrl}/services" class="card">
          <span class="card-title">Connected Growth Systems →</span>
          <span class="card-desc">Explore our frameworks for AI automation, CRM, and founder branding.</span>
        </a>

        <a href="${siteUrl}/insights" class="card">
          <span class="card-title">Strategic Insights →</span>
          <span class="card-desc">Read our latest thinking on visibility, positioning, and execution.</span>
        </a>

        <a href="${siteUrl}/about" class="card" style="margin-bottom: 0;">
          <span class="card-title">Our Story →</span>
          <span class="card-desc">Learn why we focus on building digital systems that last.</span>
        </a>
      </div>

      <div class="footer">
        <div class="social-links">
          <a href="https://linkedin.com/company/socieas">LinkedIn</a>
          <a href="https://x.com/socieas">X / Twitter</a>
          <a href="https://instagram.com/socieas">Instagram</a>
        </div>
        <p>&copy; 2026 Socieas. All rights reserved.</p>
        <p style="font-size: 12px;">You received this because you contacted us at socieas.com</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Internal notification
    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      replyTo: email,
      subject: `New Inquiry: ${name} - ${goal || "Contact Form"}`,
      html: internalHtml,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We received your message — Socieas",
      html: userHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("CONTACT API ERROR:", err);
    console.error(err?.message);
    console.error(err?.stack);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}