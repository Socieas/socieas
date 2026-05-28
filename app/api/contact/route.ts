import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

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

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const formEl = body;

    const {
      name,
      email,
      company,
      goal,
      message,
      turnstileToken,
    } = formEl;

    /* VALIDATION */

    if (
      !name ||
      !email ||
      !message
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* TURNSTILE VERIFICATION */
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

    /* INTERNAL NOTIFICATION EMAIL */
    await resend.emails.send({
      from: "Socieas Contact <contact@socieas.com>",
      to: "ankitdesizns@gmail.com",
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

    /* USER CONFIRMATION EMAIL */
    await resend.emails.send({
      from: "Socieas <contact@socieas.com>",
      to: email,
      subject: "We received your message — Socieas",
      html: `
        <h2>Thanks for reaching out, ${name}!</h2>
        <p>We've received your message and will get back to you within 1-2 business days.</p>
        <p>Here's a summary of what you sent:</p>
        <ul>
          <li><strong>Goal:</strong> ${goal || "N/A"}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>In the meantime, feel free to explore our <a href="https://socieas.com/insights">latest insights</a>.</p>
        <br/>
        <p>Warm regards,<br/>The Socieas Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
