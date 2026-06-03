import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, company, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ADMIN EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Lead Received | ${name}`,
      html: `
        <div style="max-width:700px; margin:auto; background:white; border-radius:10px; overflow:hidden; font-family:Arial,sans-serif; border:1px solid #e0e0e0;">
          <div style="background:#4F46E5; padding:24px 32px;">
            <h1 style="color:white; margin:0; font-size:22px;">New Lead Received</h1>
          </div>
          <div style="padding:32px;">
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#666; width:140px;">Name</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#666;">Email</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0;">${email}</td></tr>
              <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#666;">Company</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0;">${company || "Not provided"}</td></tr>
              <tr><td style="padding:10px 0; border-bottom:1px solid #f0f0f0; color:#666;">Service</td><td style="padding:10px 0; border-bottom:1px solid #f0f0f0;">${service || "Not specified"}</td></tr>
              <tr><td style="padding:10px 0; color:#666; vertical-align:top;">Message</td><td style="padding:10px 0; white-space:pre-wrap;">${message}</td></tr>
            </table>
          </div>
        </div>
      `,
    });

    // USER CONFIRMATION EMAIL
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thanks for reaching out to Socieas!",
      html: `
        <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; font-family:Arial,sans-serif; border:1px solid #e0e0e0;">
          <div style="background:#4F46E5; padding:24px 32px;">
            <h1 style="color:white; margin:0; font-size:22px;">Thank You, ${name}!</h1>
          </div>
          <div style="padding:32px;">
            <p style="color:#333; line-height:1.6;">We've received your message and will get back to you within 24 hours.</p>
            <p style="color:#333; line-height:1.6;">Here's a summary of what you sent:</p>
            <div style="background:#f9f9f9; border-radius:8px; padding:20px; margin:20px 0;">
              <p style="margin:0 0 8px;"><strong>Service Interested In:</strong> ${service || "General Inquiry"}</p>
              <p style="margin:0; color:#666;">${message}</p>
            </div>
            <p style="color:#333;">Best regards,<br><strong>The Socieas Team</strong></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
