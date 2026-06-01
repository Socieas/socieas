import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

/* eslint-disable @typescript-eslint/no-explicit-any */

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!to) {
    console.error("Email error: Recipient address is empty.");
    return false;
  }

  let sent = false;

  if (resend) {
    try {
      console.log(`Attempting Resend to ${to}...`);
      const res: any = await resend.emails.send({
        from: process.env.EMAIL_FROM || "Socieas <hello@socieas.com>",
        to,
        subject,
        html,
      });
      if (res.data) {
        sent = true;
      }
    } catch (err: any) {
      console.error("Resend error:", err?.message);
    }
  }

  if (!sent && process.env.SMTP_HOST) {
    try {
      console.log(`Attempting SMTP to ${to}...`);
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
      sent = true;
    } catch (err: any) {
      console.error("SMTP error:", err?.message);
    }
  }

  return sent;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, service, message, turnstileToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Verify Turnstile
    if (turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
        try {
            const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success && process.env.NODE_ENV === 'production') {
                return NextResponse.json({ error: "Security check failed" }, { status: 400 });
            }
        } catch (err) {
            console.error("Turnstile verification error:", err);
        }
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
        <p style="color:#F57F20; margin-top:8px; font-weight: 600;">Contact Notification</p>
      </div>`;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
        <div style="max-width:700px; margin:auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          ${commonHeader}
          <div style="padding:32px;">
            <h2 style="color:#111;">New contact received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not selected'}</p>
            <div style='margin-top:24px; padding:20px; background:#f9fafb; border-radius:12px;'>
              <strong>Message:</strong>
              <p style='margin-top:10px;'>${message}</p>
            </div>
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
            <h2 style="color:#111;">Hi ${name},</h2>
            <p>Thank you for reaching out to Socieas. We've successfully received your inquiry and our team is reviewing it. You can expect a response within 24 hours.</p>
            <div style="margin-top:30px;">
              <a href="https://socieas.com" style="background:#F57F20; color:white; padding:14px 24px; text-decoration:none; border-radius:10px; font-weight: bold;">Visit Socieas</a>
            </div>
            <p style="margin-top:30px; color:#666;">Team Socieas</p>
          </div>
          ${footerHtml}
        </div>
      </div>`;

    const adminSent = await sendEmail({
      to: process.env.CONTACT_RECEIVER || "hello@socieas.com",
      subject: `🚀 New Lead Received | ${name}`,
      html: adminHtml,
    });

    const userSent = await sendEmail({
      to: email,
      subject: "We've received your inquiry | Socieas",
      html: userHtml,
    });

    return NextResponse.json({ success: true, adminSent, userSent });
  } catch (error: any) {
    console.error("CONTACT API ERROR:", error?.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
