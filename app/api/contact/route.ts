import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

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

    /* EMAIL 1 — INTERNAL NOTIFICATION TO SOCIEAS TEAM */

    const internalEmail =
      await resend.emails.send({
        from: "Socieas <hello@socieas.com>",
        to: "hello@socieas.com",
        replyTo: email,
        subject: `New Inquiry from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:32px;background:#F9FAFB;">
            <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:24px;padding:40px;border:1px solid #E5E7EB;">
              <div style="display:flex;align-items:center;margin-bottom:32px;">
                <div style="width:40px;height:40px;background:#111827;border-radius:10px;margin-right:14px;"></div>
                <span style="font-size:20px;font-weight:700;color:#111827;">Socieas</span>
              </div>
              <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
                <p style="margin:0;color:#15803D;font-size:14px;font-weight:600;">&#128276; New contact form submission received</p>
              </div>
              <h1 style="margin:0 0 24px;font-size:26px;color:#111827;font-weight:700;">New Contact Inquiry</h1>
              <table style="width:100%;border-collapse:collapse;">
                <tr style="border-bottom:1px solid #F3F4F6;">
                  <td style="padding:14px 0;font-weight:700;color:#6B7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;width:120px;">Name</td>
                  <td style="padding:14px 0;color:#111827;font-weight:600;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #F3F4F6;">
                  <td style="padding:14px 0;font-weight:700;color:#6B7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Email</td>
                  <td style="padding:14px 0;"><a href="mailto:${email}" style="color:#2563EB;text-decoration:none;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #F3F4F6;">
                  <td style="padding:14px 0;font-weight:700;color:#6B7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Company</td>
                  <td style="padding:14px 0;color:#374151;">${company || "Not Provided"}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;font-weight:700;color:#6B7280;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Goal</td>
                  <td style="padding:14px 0;color:#374151;">${goal || "Not Selected"}</td>
                </tr>
              </table>
              <div style="margin-top:28px;">
                <h2 style="font-size:15px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Message</h2>
                <div style="background:#F9FAFB;padding:24px;border-radius:14px;color:#374151;line-height:1.8;border-left:4px solid #111827;">
                  ${message}
                </div>
              </div>
              <div style="margin-top:32px;">
                <a href="mailto:${email}" style="display:inline-block;background:#111827;color:#ffffff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${name}</a>
              </div>
              <p style="margin-top:32px;color:#9CA3AF;font-size:12px;border-top:1px solid #F3F4F6;padding-top:20px;">This email was sent automatically from the Socieas contact form.</p>
            </div>
          </div>
        `,
      });

    if (internalEmail.error) {
      console.error("INTERNAL EMAIL ERROR:", internalEmail.error);
      return NextResponse.json(
        { error: internalEmail.error.message },
        { status: 500 }
      );
    }

    /* EMAIL 2 — CONFIRMATION EMAIL TO THE PERSON WHO FILLED THE FORM */

    const confirmationEmail =
      await resend.emails.send({
        from: "Socieas <hello@socieas.com>",
        to: email,
        subject: `We received your message, ${name.split(" ")[0]}!`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:32px;background:#F9FAFB;">
            <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:24px;padding:40px;border:1px solid #E5E7EB;">
              <div style="display:flex;align-items:center;margin-bottom:36px;">
                <div style="width:40px;height:40px;background:#111827;border-radius:10px;margin-right:14px;"></div>
                <span style="font-size:20px;font-weight:700;color:#111827;">Socieas</span>
              </div>
              <h1 style="margin:0 0 12px;font-size:28px;color:#111827;font-weight:700;">Thanks for reaching out, ${name.split(" ")[0]}!</h1>
              <p style="color:#4B5563;font-size:16px;line-height:1.7;margin:0 0 28px;">We've received your message and our team will get back to you within <strong>1-2 business days</strong>.</p>
              <div style="background:#F9FAFB;border-radius:16px;padding:24px;margin-bottom:28px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">Your message</p>
                <p style="margin:0;color:#374151;line-height:1.7;font-style:italic;">&ldquo;${message}&rdquo;</p>
              </div>
              <div style="background:#F0F9FF;border-radius:16px;padding:24px;margin-bottom:28px;border:1px solid #BAE6FD;">
                <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#0369A1;">&#128640; What happens next?</p>
                <ul style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:2;">
                  <li>Our team reviews your inquiry</li>
                  <li>We'll reach out to schedule a conversation</li>
                  <li>We'll put together a tailored plan for your goals</li>
                </ul>
              </div>
              <p style="color:#4B5563;font-size:15px;line-height:1.7;">In the meantime, feel free to explore our <a href="https://socieas.com/insights" style="color:#111827;font-weight:600;">latest insights</a> or reply directly to this email if you have any questions.</p>
              <div style="margin-top:36px;padding-top:24px;border-top:1px solid #F3F4F6;">
                <p style="margin:0;color:#111827;font-weight:600;">The Socieas Team</p>
                <p style="margin:4px 0 0;color:#6B7280;font-size:13px;">hello@socieas.com &nbsp;|&nbsp; socieas.com</p>
              </div>
            </div>
          </div>
        `,
      });

    if (confirmationEmail.error) {
      console.error("CONFIRMATION EMAIL ERROR:", confirmationEmail.error);
    }

    return NextResponse.json({
      success: true,
      internal: internalEmail.data,
      confirmation: confirmationEmail.data,
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
