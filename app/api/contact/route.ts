import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // Use SSL for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Helps with some shared hosting/private SMTP issues
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, company, service, message, turnstileToken } = body;

    // Verify Cloudflare Turnstile
    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      console.error("Turnstile verification failed:", turnstileData);
      return NextResponse.json(
        { error: "Security check failed. Please try again." },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // ADMIN EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Lead Received | ${name}`,
      html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          
          <div style="background:#44006D; padding:30px; text-align:center;">
            <h1 style="color:white; margin:0;">SOCIEAS</h1>
            <p style="color:#F57F20; margin-top:8px;">New Lead Notification</p>
          </div>

          <div style="padding:32px;">
            <h2 style="color:#111;">A new inquiry has arrived</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Service:</strong> ${service || "Not selected"}</p>

            <div style="margin-top:24px; padding:20px; background:#f9fafb; border-radius:12px;">
              <strong>Message:</strong>
              <p style="margin-top:10px;">${message}</p>
            </div>

            <div style="margin-top:30px;">
              <a href="mailto:${email}" style="background:#F57F20; color:white; padding:14px 24px; text-decoration:none; border-radius:10px;">
                Reply to Lead
              </a>
            </div>
          </div>
        </div>
      </div>
      `,
    });

    // USER CONFIRMATION EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "We have received your inquiry | Socieas",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          
          <div style="background:#44006D; padding:30px; text-align:center;">
            <h1 style="color:white; margin:0;">SOCIEAS</h1>
            <p style="color:#F57F20; margin-top:8px;">
              Building Growth Through Digital Innovation
            </p>
          </div>

          <div style="padding:32px;">
            <h2 style="color:#111;">Hi ${name},</h2>

            <p>
              Thank you for reaching out to Socieas.
            </p>

            <p>
              We’ve successfully received your inquiry and our team is reviewing it.
              You can expect a response within 24 hours.
            </p>

            <p>
              We’re excited to explore how we can help elevate your digital presence.
            </p>

            <div style="margin-top:30px;">
              <a href="https://socieas.com"
                 style="background:#F57F20; color:white; padding:14px 24px; text-decoration:none; border-radius:10px;">
                 Visit Socieas
              </a>
            </div>

            <p style="margin-top:30px; color:#666;">
              Team Socieas
            </p>
          </div>

          <div style="padding:20px; text-align:center; background:#f9fafb; font-size:14px;">
            socieas.com
          </div>
        </div>
      </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}