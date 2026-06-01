/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!to) {
    console.error("Email error: Recipient address is empty.");
    return false;
  }

  let sent = false;

  // 1. Try Resend
  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || "Socieas <onboarding@resend.dev>",
        to,
        subject,
        html,
      });
      if (!error) {
        console.log(`Resend success to ${to}`);
        sent = true;
      } else {
        console.error(`Resend error to ${to}:`, error);
      }
    } catch (err: any) {
      console.error(`Resend exception to ${to}:`, err?.message || err);
    }
  }

  // 2. Fallback to SMTP
  if (!sent && process.env.SMTP_HOST) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      console.log(`SMTP success to ${to}`);
      sent = true;
    } catch (err: any) {
      console.error(`SMTP error to ${to}:`, err?.message || err);
    }
  }

  return sent;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const footerHtml = `
      <div style="padding:20px; text-align:center; background:#f9fafb; font-size:14px; border-top: 1px solid #eee;">
         <div style="margin-bottom: 15px;">
            <a href="https://www.linkedin.com/company/socieas/" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">LinkedIn</a>
            <a href="https://www.instagram.com/socieas" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">Instagram</a>
            <a href="https://x.com/socieas" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">X</a>
            <a href="https://www.facebook.com/socieas" style="margin: 0 10px; text-decoration: none; color: #44006D; font-weight: 600;">Facebook</a>
         </div>
         <p style="color: #666; margin: 0;">socieas.com</p>
      </div>`;

    const commonHeader = `
      <div style="background:#44006D; padding:30px; text-align:center;">
        <div style="color:white; font-size: 28px; font-weight: 900; font-family: sans-serif; letter-spacing: -0.05em;">Socieas.</div>
        <p style="color:#F57F20; margin-top:8px; font-weight: 600;">Newsletter Notification</p>
      </div>`;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          ${commonHeader}
          <div style="padding:32px;">
            <h2 style="color:#111;">New newsletter received</h2>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          ${footerHtml}
        </div>
      </div>`;

    const userHtml = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          <div style="background:#44006D; padding:30px; text-align:center;">
            <div style="color:white; font-size: 28px; font-weight: 900; font-family: sans-serif; letter-spacing: -0.05em;">Socieas.</div>
            <p style="color:#F57F20; margin-top:8px; font-weight: 600;">Building Growth Through Digital Innovation</p>
          </div>
          <div style="padding:32px;">
            <h2 style="color:#111;">Welcome to the community!</h2>
            <p>Thank you for subscribing to Socieas Founder Insights.</p><p>You'll receive weekly strategies on founder visibility, positioning, AI systems, and scalable growth.</p>
            <div style="margin-top:30px;">
              <a href="https://socieas.com" style="background:#F57F20; color:white; padding:14px 24px; text-decoration:none; border-radius:10px; font-weight: bold;">Visit Socieas</a>
            </div>
            <p style="margin-top:30px; color:#666;">Team Socieas</p>
          </div>
          ${footerHtml}
        </div>
      </div>`;

    // Try to send emails
    const adminSent = await sendEmail({
      to: process.env.CONTACT_RECEIVER || "",
      subject: `🔔 New Newsletter Subscriber | ${email}`,
      html: adminHtml,
    });

    const userSent = await sendEmail({
      to: email,
      subject: 'Welcome to Socieas Insights',
      html: userHtml,
    });

    if (!adminSent && !userSent && process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("NEWSLETTER API ERROR:", error?.message || error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
