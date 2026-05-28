import { NextResponse } from "next/server";

// — Cloudflare Turnstile verification ————————————————
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

// — Send email via Resend HTTP API ————————————————
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const from = process.env.RESEND_FROM_EMAIL || "Socieas <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

// — POST handler ————————————————————————————
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
    const isHuman = await verifyTurnstile(turnstileToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "Turnstile verification failed" },
        { status: 400 }
      );
    }

    const notifyEmail = process.env.NOTIFY_EMAIL || "ankitdesizns@gmail.com";

    // Send internal notification
    await sendEmail(
      notifyEmail,
      `New Inquiry from ${name}`,
      `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Goal:</strong> ${goal || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    );

    // Send confirmation to user
    await sendEmail(
      email,
      "We received your message — Socieas",
      `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>We've received your message and will get back to you within 1-2 business days.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Best,<br/>The Socieas Team</p>
      `
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
