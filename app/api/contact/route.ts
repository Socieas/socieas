import { NextResponse } from "next/server";

// -- Cloudflare Turnstile verification
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
    const notifyEmail = process.env.NOTIFY_EMAIL || "ankitdesizns@gmail.com";

    // Internal notification to you
    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Goal:</strong> ${goal || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "We received your message — Socieas",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out! We've received your message and will get back to you within 1–2 business days.</p>
        <p>Best,<br/>The Socieas Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
  console.error("CONTACT API ERROR:", error);
  console.error(error?.message);
  console.error(error?.stack);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}