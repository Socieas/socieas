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
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">New Inquiry Received</h2>
        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Primary Goal:</strong> ${goal || "N/A"}</p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #7c3aed;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #6b7280; text-align: center;">This inquiry was sent from the Socieas contact form.</p>
      </div>
    `;

    // Internal notification
    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      replyTo: email,
      subject: `New Inquiry: ${name} - ${goal || "Contact Form"}`,
      html: internalHtml,
    });

    // User confirmation template
    const userHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #111;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; font-weight: 900; margin: 0; color: #111;">Socieas<span style="color: #7c3aed;">.</span></h1>
        </div>

        <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 20px;">Hi ${name},</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 30px;">
          Thanks for reaching out! We've received your message and our team is already reviewing it. You can expect to hear from us within 1–2 business days to discuss how we can help you scale.
        </p>

        <div style="background: #f5f3ff; border-radius: 16px; padding: 30px; margin-bottom: 40px;">
          <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7c3aed; margin-bottom: 15px;">While you wait...</h3>
          <p style="font-size: 15px; color: #4b5563; margin-bottom: 20px;">Explore how we build connected growth systems:</p>

          <div style="display: grid; gap: 15px;">
            <a href="${siteUrl}/services" style="display: block; background: white; padding: 15px; border-radius: 12px; text-decoration: none; border: 1px solid #ddd; transition: all 0.3s;">
              <span style="font-weight: 700; color: #111; display: block;">Our Services →</span>
              <span style="font-size: 13px; color: #6b7280;">AI Automation, CRM, and Founder Branding.</span>
            </a>
            <a href="${siteUrl}/insights" style="display: block; background: white; padding: 15px; border-radius: 12px; text-decoration: none; border: 1px solid #ddd; margin-top: 10px;">
              <span style="font-weight: 700; color: #111; display: block;">Strategic Insights →</span>
              <span style="font-size: 13px; color: #6b7280;">Blogs, case studies, and execution stories.</span>
            </a>
            <a href="${siteUrl}/about" style="display: block; background: white; padding: 15px; border-radius: 12px; text-decoration: none; border: 1px solid #ddd; margin-top: 10px;">
              <span style="font-weight: 700; color: #111; display: block;">About Socieas →</span>
              <span style="font-size: 13px; color: #6b7280;">Our mission to build growth that lasts.</span>
            </a>
          </div>
        </div>

        <div style="border-top: 1px solid #eee; pt-30px; text-align: center; padding-top: 30px;">
          <p style="font-size: 14px; color: #6b7280; margin: 0;">
            Best,<br/>
            <strong>The Socieas Team</strong>
          </p>
        </div>
      </div>
    `;

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