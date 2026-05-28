import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Nodemailer transporter using Hostinger SMTP ────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL on port 465
    auth: {
      user: process.env.SMTP_USER, // contact@socieas.com
      pass: process.env.SMTP_PASS, // email account password
    },
  });
}

// ── Cloudflare Turnstile verification ─────────────────────────────────────
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

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    const { name, email, company, goal, message, turnstileToken } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // Turnstile verification
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Missing security token" },
        { status: 400 }
      );
    }
    const isHuman = await verifyTurnstile(turnstileToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Security check failed" },
        { status: 403 }
      );
    }

    const transporter = createTransporter();

    // ── Email 1: Internal notification to Ankit ─────────────────────────
    await transporter.sendMail({
      from: `"Socieas Contact" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || "ankitdesizns@gmail.com",
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">New Contact Form Submission</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px; font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Company</td><td style="padding:8px;">${company || "—"}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Primary Goal</td><td style="padding:8px;">${goal || "—"}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Message</td><td style="padding:8px;">${message}</td></tr>
          </table>
        </div>
      `,
    });

    // ── Email 2: Confirmation to the user ───────────────────────────────
    await transporter.sendMail({
      from: `"Socieas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — Socieas",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">Thanks for reaching out, ${name}!</h2>
          <p style="color: #444;">We've received your message and will get back to you within 1–2 business days.</p>
          <blockquote style="border-left: 3px solid #ccc; padding-left: 16px; color: #666; margin: 20px 0;">
            ${message}
          </blockquote>
          <p style="color: #444;">In the meantime, feel free to explore our work at <a href="https://socieas.com">socieas.com</a>.</p>
          <p style="color: #444;">— The Socieas Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Your message has been sent!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
