import { NextResponse } from "next/server";

// — Cloudflare Turnstile verification ————————————————————————
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

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

// — POST handler ——————————————————————————————————————————
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

    // Verify Turnstile
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Missing Turnstile token" },
        { status: 400 }
      );
    }
    const isValid = await verifyTurnstile(turnstileToken);
    if (!isValid) {
      return NextResponse.json(
        { error: "Turnstile verification failed" },
        { status: 400 }
      );
    }

    // Dynamic import to avoid bundling issues with nodemailer
    const nodemailer = (await import("nodemailer")).default;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send internal notification
    await transporter.sendMail({
      from: `"Socieas Contact" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || "ankitdesizns@gmail.com",
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <table style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border-collapse:collapse">
          <tr><td colspan="2" style="background:#7c3aed;color:#fff;padding:20px;font-size:18px;font-weight:bold">New Inquiry from ${name}</td></tr>
          <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;width:140px">Name</td><td style="padding:12px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:12px;border-bottom:1px solid #eee">${email}</td></tr>
          <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold">Company</td><td style="padding:12px;border-bottom:1px solid #eee">${company || "—"}</td></tr>
          <tr><td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold">Goal</td><td style="padding:12px;border-bottom:1px solid #eee">${goal || "—"}</td></tr>
          <tr><td style="padding:12px;font-weight:bold">Message</td><td style="padding:12px">${message}</td></tr>
        </table>
      `,
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: `"Socieas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — Socieas",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
          <div style="background:#7c3aed;color:#fff;padding:24px;text-align:center">
            <h1 style="margin:0;font-size:24px">We got your message!</h1>
          </div>
          <div style="padding:24px">
            <p>Hi ${name},</p>
            <p>Thanks for reaching out to Socieas. We've received your inquiry and will get back to you within 1-2 business days.</p>
            <p><strong>Your message:</strong><br/>${message}</p>
            <p>Best regards,<br/>The Socieas Team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
